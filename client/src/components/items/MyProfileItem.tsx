import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import useAuth from '../../hooks/queries/useAuth';
import UserAvatar from '../UI/UserAvatar';
// import { User } from '../../types/api/entities/user';

const MyProfileItem: React.FC = () => {
  const { data: user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  // const [avatar, setAvatar] = useState<string | undefined>(
  //   user ? user.photo ?? undefined : undefined,
  // );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setEditMode(true);
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCancel = () => {
    setName(user.name);
    // setAvatar(user.photo ?? undefined);
    setEditMode(false);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAvatar(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box gap={2} sx={{ display: 'flex', alignItems: 'flex-top', marginBottom: 2, paddingBlock: 1 }}>
      <UserAvatar onClick={handleAvatarClick} user={user} sx={{ width: 60, height: 60 }} />

      <Stack direction="row" alignItems="center" gap={1}>
        <TextField
          disabled={!editMode}
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          size="small"
          inputRef={textFieldRef}
          sx={{
            width: 180,
            height: 40,
            '.MuiInputBase-root': {
              height: '100%',
            },
            '.MuiOutlinedInput-input': {
              padding: '8px 10px',
            },
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
              fontWeight: 'bold',
            },
          }}
        />

        {!editMode && (
          <CreateIcon
            color="disabled"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={handleEditClick}
          />
        )}
      </Stack>

      {editMode && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" size="small" onClick={handleSave}>
              OK
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyProfileItem;