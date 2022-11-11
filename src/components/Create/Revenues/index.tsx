import { IProps } from "./index.types";
import { Modal, NumberInput, Select, Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IRevenue } from "../../../types";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRevenue } from "../../../lib/hooks";

const CreateRevenue = ({ isOpen, onClose, refetch }: IProps) => {
  const { data, isLoading, mutate } = useMutation(createRevenue, {
    onSuccess: (e) => {
      refetch();
      onClose();
      reset();
      console.log("Cadastrado:", e);
    },
    onError: (e) => {
      console.error("Erro ao cadastrar:", e);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IRevenue>({
    defaultValues: {
      value: 0.0,
      date: new Date(),
      type: "Salário",
    },
  });
  const onSubmit = (data: IRevenue) => {
    let revenue = Object.assign(data, {
      date: new Date(data.date),
    });
    console.log("valores:", revenue);

    mutate(revenue);
  };

  let [typeList, setTypeList] = useState([
    { label: "Salário", value: "Salário" },
    { label: "Freelancer", value: "Freelancer" },
    { label: "Outro", value: "Outro" },
  ]);

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Cadastrar recebimento"
      fullScreen
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NumberInput
          label="Valor"
          placeholder="Digite seu valor recebido"
          defaultValue={0.0}
          min={0}
          step={0.01}
          precision={2}
          value={watch("value")}
          withAsterisk
          required
          description={"Descreva quanto você recebeu"}
          onChange={(e: number) => {
            setValue("value", e);
          }}
        />
        <DatePicker
          placeholder="Data do valor recebido"
          label="Data"
          withAsterisk
          description="Selecione a data em que recebeu o valor"
          locale="pt-br"
          value={watch("date")}
          onChange={(e: Date) => {
            setValue("date", e);
          }}
          required
        />
        <Select
          label="Tipo"
          placeholder="Tipo de recebimento"
          withAsterisk
          description="Selecione o tipo de recebimento referente à esse valor"
          data={typeList}
          onChange={(e: string) => {
            setValue("type", e);
          }}
        />
        <br />
        <Button fullWidth type="submit">
          {" "}
          Salvar
        </Button>
      </form>
    </Modal>
  );
};

export default CreateRevenue;
