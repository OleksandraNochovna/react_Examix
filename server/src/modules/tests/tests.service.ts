import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTestDtoAuthorId } from './dtos/create-test.dto';
import { Prisma, Question, Test, TestQuestion, User } from '@prisma/client';
import { GetTestsDto } from './dtos/get-tests.dto';
import { Answer } from '../questions/interfaces/question.interface';
import { DETAILED_TEST_SELECT } from './utils/detailed-test-select';

@Injectable()
export class TestsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ questions, name, image, description, subject, authorId }: CreateTestDtoAuthorId) {
    return this.prismaService.$transaction(async (prisma) => {
      const test = await prisma.test.create({
        data: { name, image, description, authorId, subject },
      });

      const { count } = await prisma.testQuestion.createMany({
        data: questions.map((question) => ({
          ...question,
          testId: test.id,
        })),
      });

      return [test, count] as const;
    });
  }

  async getAll({ limit, page, search, subjects, authorId }: GetTestsDto = {}) {
    const skip = limit && page ? (page - 1) * limit : 0;
    const where: Prisma.TestWhereInput = {};

    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (subjects && subjects.length > 0) {
      where.AND = {
        OR: [{ subject: { in: subjects } }, { subject: null }],
      };
    }

    const [tests, testsAmount] = await this.prismaService.$transaction([
      this.prismaService.test.findMany({
        where: { ...where, authorId },
        skip,
        take: limit,
      }),
      this.prismaService.test.count({
        where: { ...where, authorId },
      }),
    ]);

    const pagesAmount = limit ? Math.ceil(testsAmount / limit) : 1;

    return {
      tests,
      pagesAmount,
      amount: testsAmount,
    };
  }

  async getOne(testId: Test['id']) {
    return this.prismaService.test.findUnique({
      where: { id: testId },
      select: DETAILED_TEST_SELECT,
    }) as any as Test & { author: Pick<User, 'name' | 'createdAt' | 'photo'> } & {
      testQuestions: Array<TestQuestion & { question: Question & { answers: Answer[] } }>;
    }; // use any here because type JsonValue have to be always Answer[]
  }

  getTestName(testId: Test['id']) {
    return this.prismaService.test.findUnique({
      where: { id: testId },
      select: { name: true },
    });
  }
}
