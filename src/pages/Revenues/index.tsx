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
import { CreateRevenue, DeleteRevenue, EditRevenue } from "../../components";
import { useGetAllRevenues } from "../../lib/hooks";
import { IRevenue } from "../../types";
import { IconPencil } from "@tabler/icons";

const Revenues = () => {
  const [isCreate, setCreate] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [tempRevenue, setTempRevenue] = useState<IRevenue>();

  const { data: lista, refetch } = useGetAllRevenues();

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

      {lista?.map((chave: IRevenue) => {
        return (
          <Box
            sx={(theme) => ({
              background: theme.colors.dark,
              borderLeft: `5px solid ${theme.colors.green[6]}`,
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
                  setTempRevenue(chave);
                }}
              >
                <IconPencil size={16} />
              </ActionIcon>
              <CloseButton
                title="Excluir recebimento"
                onClick={() => {
                  setDelete(true);
                  setTempRevenue(chave);
                }}
              />
            </Flex>
          </Box>
        );
      })}

      <CreateRevenue
        isOpen={isCreate}
        onClose={() => {
          setCreate(false);
        }}
        refetch={refetch}
      />
      <DeleteRevenue
        isOpen={isDelete}
        onClose={() => {
          setDelete(false);
        }}
        recebimento={tempRevenue}
        refetch={refetch}
      />
      <EditRevenue
        isOpen={isEdit}
        onClose={() => {
          setEdit(false);
        }}
        recebimento={tempRevenue}
        refetch={refetch}
      />
    </Container>
  );
};
export default Revenues;
