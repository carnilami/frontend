import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../entities/User";
import useUpdateProfile from "../../hooks/users/useUpdateProfile";
import useUser from "../../hooks/users/useUser";
import { PROFILE_CDN_URL } from "../../utils/constants";
import { ProfileFormSchema } from "../../utils/validations";

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { data: userData } = useUser();
  const updateUserProfile = useUpdateProfile();

  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    bio: userData?.bio || "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(ProfileFormSchema),
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  const onSubmit = (data: UserProfile) => {
    if (profileImage !== undefined) {
      data = { ...data, profilePicture: profileImage };
    }
    updateUserProfile.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        resetModal();
      },
    });
  };

  const resetModal = () => {
    reset();
    setProfileImage(undefined);
    setProfileData({
      name: userData?.name || "",
      bio: userData?.bio || "",
    });
    onClose();
  };

  const isProfileUnchanged =
    profileData.name === userData?.name &&
    profileData.bio === userData?.bio &&
    profileImage === undefined;

  return (
    <>
      <IconButton
        aria-label="Edit Profile"
        icon={<EditIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={resetModal}>
        <ModalOverlay />
        <ModalContent py={2}>
          <ModalHeader>
            <Heading size="md" pb={1}>
              Edit Profile
            </Heading>
            <Text fontSize="sm">
              You can edit your profile from here. Profile image may take few
              minutes to change.
            </Text>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Container centerContent mb={4}>
                <Avatar
                  size="xl"
                  name={userData?.name}
                  src={
                    profileImage !== undefined
                      ? profileImage
                      : PROFILE_CDN_URL + userData?.profilePicture
                  }
                  border="2px solid"
                />
                <ButtonGroup isAttached mt={2}>
                  <Button {...getRootProps()} variant="primary" size="sm">
                    <input {...getInputProps()} />
                    Change
                  </Button>
                  {profileImage === undefined && userData?.profilePicture && (
                    <IconButton
                      size="sm"
                      colorScheme="red"
                      aria-label="remove"
                      icon={<DeleteIcon />}
                      onClick={() => setProfileImage("")}
                    />
                  )}
                </ButtonGroup>
              </Container>
              <Stack>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...register("name")}
                    defaultValue={userData?.name}
                    variant="filled"
                    type="text"
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                  <FormHelperText>Must be your legal name.</FormHelperText>
                  {errors.name && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      {errors.name.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.bio}>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    {...register("bio")}
                    variant="filled"
                    defaultValue={userData?.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                  />
                  {errors.bio && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      {errors.bio.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={resetModal} mr={3}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                isDisabled={isProfileUnchanged}
                isLoading={updateUserProfile.isPending}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
