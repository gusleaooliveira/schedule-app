import {
  Container,
  Button,
  Box,
  Text,
  CloseButton,
  Overlay,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { useState } from "react";
import {
  CreateExpense,
  CreateRevenue,
  DeleteExpense,
  DeleteRevenue,
  EditExpense,
  EditRevenue,
} from "../../components";
import { useGetAllExpenses, useGetAllRevenues } from "../../lib/hooks";
import { IExpense, IRevenue } from "../../types";
import { IconPencil } from "@tabler/icons";

const Expenses = () => {
  const [isCreate, setCreate] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [TempExpenses, setTempExpenses] = useState<IExpense>();

  const { data: lista, refetch } = useGetAllExpenses();

  return (
    <Container
      fluid
      sx={(theme) => ({
        marginTop: "10px",
      })}
    >
      <Button
        onClick={() => {
          setCreate(true);
        }}
      >
        Cadastrar
      </Button>

      {lista?.map((chave: IExpense) => {
        return (
          <Box
            sx={(theme) => ({
              background: theme.colors.dark,
              borderLeft: `5px solid ${theme.colors.orange[6]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              marginTop: "10px",
            })}
          >
            <Text> R$ {chave.value.toFixed(2)} </Text>

            <Flex direction="row">
              {" "}
              <ActionIcon
                onClick={() => {
                  setEdit(true);
                  setTempExpenses(chave);
                }}
              >
                <IconPencil size={16} />
              </ActionIcon>
              <CloseButton
                title="Excluir recebimento"
                onClick={() => {
                  setDelete(true);
                  setTempExpenses(chave);
                }}
              />
            </Flex>
          </Box>
        );
      })}

      <CreateExpense
        isOpen={isCreate}
        onClose={() => {
          setCreate(false);
        }}
        refetch={refetch}
      />
      <DeleteExpense
        isOpen={isDelete}
        onClose={() => {
          setDelete(false);
        }}
        gasto={TempExpenses}
        refetch={refetch}
      />
      <EditExpense
        isOpen={isEdit}
        onClose={() => {
          setEdit(false);
        }}
        gasto={TempExpenses}
        refetch={refetch}
      />
    </Container>
  );
};
export default Expenses;
