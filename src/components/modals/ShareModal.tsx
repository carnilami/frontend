import { CheckIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Editable,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook, FaThreads, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AnimatedCopyIcon = motion(CopyIcon);
const AnimatedCheckIcon = motion(CheckIcon);

interface Props {
  auctionId: string;
  outline?: boolean
}

const ShareModal = ({ auctionId, outline = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    "/auctions/" + auctionId
  );
  const socials = [
    { icon: <Icon as={FaWhatsapp} fontSize="2xl" />, name: "whatsapp" },
    { icon: <Icon as={FaFacebook} fontSize="2xl" />, name: "facebook" },
    { icon: <Icon as={FaInstagram} fontSize="2xl" />, name: "instagram" },
    { icon: <Icon as={FaXTwitter} fontSize="2xl" />, name: "twitter" },
    { icon: <Icon as={FaThreads} fontSize="2xl" />, name: "threads" },
  ];

  return (
    <>
      <Button size={{ base: "sm", sm: "md" }} variant={outline ? "outline" : "solid"} onClick={onOpen} leftIcon={<ExternalLinkIcon />}>
        Share
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <ButtonGroup spacing={6} size="lg" variant="solid">
                {socials.map((social, index) => (
                  <Link key={index} to="https://twitter.com/intent/tweet?text=Hey!%20I%20just%20auctioned%20my%20car%20on%20Car%20Nilami!%20Make%20sure%20to%20check%20it%20out.%20No%20reserve%20price,%20bid%20whatever%20you%20like!%0A%0AEnding%20in%20a%20week.%0A%0Ahttps%3A//carnilami.com/auctions/xHfjh">
                    <IconButton
                      key={social.name}
                      aria-label={social.name}
                      icon={social.icon}
                      borderRadius="full"
                    />
                  </Link>
                ))}
              </ButtonGroup>
              <Heading size="sm">Or copy link</Heading>
              <Editable>
                <InputGroup size="md">
                  <Input
                    pr="3rem"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    isReadOnly
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      aria-label="Copy auction link"
                      h="1.75rem"
                      size="sm"
                      onClick={onCopy}
                      icon={
                        hasCopied ? (
                          <AnimatedCheckIcon
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                          />
                        ) : (
                          <AnimatedCopyIcon
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                          />
                        )
                      }
                    />
                  </InputRightElement>
                </InputGroup>
              </Editable>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>I'm done sharing!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareModal;
