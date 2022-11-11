import { IProps } from "./index.types";
import { Modal, NumberInput, Select, Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IExpense, IRevenue } from "../../../types";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createExpense } from "../../../lib/hooks";

const CreateExpense = ({ isOpen, onClose, refetch }: IProps) => {
  const { data, isLoading, mutate } = useMutation(createExpense, {
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
  } = useForm<IExpense>({
    defaultValues: {
      value: 0.0,
      date: new Date(),
      type: "Frequente",
      tag: "Alimentação",
    },
  });
  const onSubmit = (data: IExpense) => {
    let expense = Object.assign(data, {
      date: new Date(data.date),
    });
    console.log("valores:", expense);

    mutate(expense);
  };

  let [typeList, setTypeList] = useState([
    { label: "Frequente", value: "Frequente" },
    { label: "Único", value: "Único" },
  ]);

  let [tagList, setTagList] = useState([
    { label: "Aluguel", value: "Aluguel" },
    { label: "Transporte", value: "Transporte" },
    { label: "Saúde", value: "Saúde" },
    { label: "Parcela", value: "Parcela" },
    { label: "Mensalidade", value: "Mensalidade" },
    { label: "Alimentação", value: "Alimentação" },
    { label: "Plano", value: "Plano" },
    { label: "Outro", value: "Outro" },
  ]);

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Cadastrar gasto"
      fullScreen
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NumberInput
          label="Valor"
          placeholder="Digite seu valor gasto"
          defaultValue={0.0}
          min={0}
          step={0.01}
          precision={2}
          value={watch("value")}
          withAsterisk
          required
          description={"Descreva quanto você gastou"}
          onChange={(e: number) => {
            setValue("value", e);
          }}
        />
        <DatePicker
          placeholder="Data do valor gasto"
          label="Data"
          withAsterisk
          description="Selecione a data em que gastou o valor"
          locale="pt-br"
          value={watch("date")}
          onChange={(e: Date) => {
            setValue("date", e);
          }}
          required
        />
        <Select
          label="Tipo"
          placeholder="Tipo de gasto"
          withAsterisk
          description="Selecione a  frequência do tipo de gasto"
          data={typeList}
          onChange={(e: string) => {
            setValue("type", e);
          }}
        />
        <Select
          label="Tag"
          placeholder="Classifque o gasto"
          withAsterisk
          description="Classifique o tipo de gasto"
          data={tagList}
          onChange={(e: string) => {
            setValue("tag", e);
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

export default CreateExpense;
