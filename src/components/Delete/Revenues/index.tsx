import { IProps } from "./index.types";
import {
  Modal,
  NumberInput,
  Select,
  Button,
  Alert,
  Flex,
  Text,
  Box,
  Overlay,
  Dialog,
  ActionIcon,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { deleteRevenue } from "../../../lib/hooks";

const DeleteRevenue = ({ isOpen, onClose, refetch, recebimento }: IProps) => {
  const { data, isLoading, mutate } = useMutation(deleteRevenue, {
    onSuccess: () => {
      refetch();
      onClose();
    },
  });
  return (
    <Dialog
      shadow="xl"
      opened={isOpen}
      onClose={() => {
        onClose();
      }}
      withCloseButton
      sx={(theme) => ({
        zIndex: 9999,
      })}
    >
      <Flex direction={"column"}>
        <Text>
          {" "}
          Deseja apagar esse recebimento de R$ {recebimento?.value.toFixed(
            2
          )}{" "}
          referente ao/à {recebimento?.type}?{" "}
        </Text>
        <br />
        <Flex direction={"row"} justify={"flex-end"}>
          {" "}
          <Flex
            justify={"space-between"}
            sx={(theme) => ({
              width: "150px",
            })}
          >
            <Button variant="default" onClick={onClose}>
              Não
            </Button>
            <Button
              variant="default"
              onClick={() => {
                mutate(recebimento?._id);
              }}
            >
              Sim
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Dialog>
  );
};

export default DeleteRevenue;
