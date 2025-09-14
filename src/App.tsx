import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

import Grid from "@mui/material/Grid";

const API_URL = import.meta.env.VITE_API_URL;



type FormType =
  | "comunicado-venda"
  | "cancelamento-intencao-venda"
  | "declaracao-endereco"
  | "alter-carac"
  | "segunda-via"
  | "req-int-venda"
  | "declaracao-motor"
  | "cancelamento-venda";

const formConfigs: Record<
  FormType,
  { label: string; fields: { name: string; label: string }[] }
> = {
  "comunicado-venda": {
    label: "Comunicado de Venda",
    fields: [
      { name: "Nome_Vendedor", label: "Nome (Vendedor)" },
      { name: "CPF_CNPJ_Vendedor", label: "CPF/CNPJ (Vendedor)" },
      { name: "Telefone_Vendedor", label: "Telefone (Vendedor)" },
      { name: "Nome_Comprador", label: "Nome (Comprador)" },
      { name: "CPF_CNPJ_Comprador", label: "CPF/CNPJ (Comprador)" },
      { name: "Placa", label: "Placa" },
      { name: "Renavam", label: "Renavam" },
      { name: "DiaVenda", label: "Dia da Venda" },
      { name: "MesVenda", label: "Mês da Venda" },
      { name: "AnoVenda", label: "Ano da Venda" },
      { name: "Cidade", label: "Cidade" },
      { name: "DiaDoc", label: "Dia do Documento" },
      { name: "MesDoc", label: "Mês do Documento" },
      { name: "AnoDoc", label: "Ano do Documento" },
    ],
  },
  "cancelamento-intencao-venda": {
    label: "Requerimento Cancelamento Intenção de Venda",
    fields: [
      { name: "NomeVendedor", label: "Nome (Vendedor)" },
      { name: "CPF_CNPJVendedor", label: "CPF/CNPJ (Vendedor)" },
      { name: "EnderecoVendedor", label: "Endereço (Vendedor)" },
      { name: "EmailVendedor", label: "E-mail (Vendedor)" },
      { name: "MunicipioVendedor", label: "Município (Vendedor)" },
      { name: "NomeComprador", label: "Nome (Comprador)" },
      { name: "CPF_CNPJComprador", label: "CPF/CNPJ (Comprador)" },
      { name: "EnderecoComprador", label: "Endereço (Comprador)" },
      { name: "MunicipioComprador", label: "Município (Comprador)" },
      { name: "EmailComprador", label: "E-mail (Comprador)" },
      { name: "Placa", label: "Placa" },
      { name: "Renavam", label: "Renavam" },
      { name: "Cidade", label: "Cidade" },
      { name: "Dia", label: "Dia" },
      { name: "Mes", label: "Mês" },
      { name: "Ano", label: "Ano" },
    ],
  },
  "declaracao-endereco": {
    label: "Declaração de Endereço",
    fields: [
      { name: "Nome", label: "Nome" },
      { name: "RG", label: "RG" },
      { name: "CPF", label: "CPF (xxx.xxx.xxx-xx)" },
      { name: "Endereco1", label: "Endereço 1" },
      { name: "Endereco2", label: "Endereço 2" },
      { name: "Numero", label: "Número" },
      { name: "Bairro", label: "Bairro" },
      { name: "Cidade", label: "Cidade" },
      { name: "CEP", label: "CEP" },
      { name: "DDD", label: "DDD" },
      { name: "Telefone", label: "Telefone" },
      { name: "CidadeDoc", label: "Cidade Documento" },
      { name: "Dia", label: "Dia" },
      { name: "Mes", label: "Mês" },
      { name: "Ano", label: "Ano" },
    ],
  },
  "alter-carac": {
    label: "Declaração Alteração de Característica",
    fields: [
      { name: "Nome", label: "Nome" },
      { name: "CPF_CNPJ", label: "CPF/CNPJ" },
      { name: "Alteracao", label: "Alteração" },
      { name: "Placa", label: "Placa" },
      { name: "Renavam", label: "Renavam" },
      { name: "Cidade", label: "Cidade" },
      { name: "Dia", label: "Dia" },
      { name: "Mes", label: "Mês" },
      { name: "Ano", label: "Ano" },
    ],
  },
  "segunda-via": {
    label: "Requerimento Segunda Via",
    fields: [
      { name: "Nome", label: "Nome" },
      { name: "CPF_CNPJ", label: "CPF/CNPJ" },
      { name: "Telefone", label: "Telefone" },
      { name: "Placa", label: "Placa" },
      { name: "Renavam", label: "Renavam" },
      { name: "Cidade", label: "Cidade" },
      { name: "Dia", label: "Dia" },
      { name: "Mes", label: "Mês" },
      { name: "Ano", label: "Ano" },
    ],
  },
  "cancelamento-venda": {
    label: "Cancelamento de Venda",
    fields: [
      { name: "Nome", label: "Nome" },
      { name: "CPF_CNPJ", label: "CPF/CNPJ" },
      { name: "Telefone", label: "Telefone" },
      { name: "Placa", label: "Placa" },
      { name: "Renavam", label: "Renavam" },
      { name: "Cidade", label: "Cidade" },
      { name: "Dia", label: "Dia" },
      { name: "Mes", label: "Mês" },
      { name: "Ano", label: "Ano" },
    ],
  },
  "declaracao-motor": {
    label: "Declaração de Responsabilidade de Motor",
    fields: [
      { name: "Nome", label: "Nome" },
      { name: "CPF_CNPJ", label: "CPF/CNPJ" },
      { name: "RG", label: "RG" },
      { name: "Rua", label: "Rua" },
      { name: "Numero", label: "Numero" },
      { name: "Bairro", label: "Bairro" },
      { name: "Estado", label: "Estado" },
      { name: "Municipio", label: "Municipio" },
      { name: "Motor", label: "Motor" },
      { name: "Placa", label: "Placa" },
      { name: "Chassi", label: "Chassi" },
      { name: "Marca", label: "Marca" },
      { name: "Cidade", label: "Cidade" },
      { name: "Dia", label: "Dia" },
      { name: "Mes", label: "Mês" },
      { name: "Ano", label: "Ano" },
    ],
  },
  "req-int-venda": {
    label: "Requerimento de Intenção de Venda",
    fields: [
      { name: "VendaName", label: "Nome do Vendedor" },
      { name: "VendaDoc", label: "CPF/CNPJ Vendedor" },
      { name: "VendaAddress", label: "Endereço do Vendedor" },
      { name: "VendaCity", label: "Cidade do Vendedor" },
      { name: "VendaEmail", label: "E-mail do Vendedor" },
      { name: "CompraName", label: "Nome do Comprador" },
      { name: "CompraCPF", label: "CPF/CNPJ do Comprador" },
      { name: "CompraAddress", label: "Endereço do Comprador" },
      { name: "CompraCity", label: "Cidade do Comprador" },
      { name: "Placa", label: "Placa" },
      { name: "Renavam", label: "Renavam" },
      { name: "Value", label: "Valor" },
      { name: "Day", label: "Dia" },
      { name: "Month", label: "Mês" },
      { name: "Year", label: "Ano" },
      { name: "DocumentCity", label: "Cidade do documento" },
      { name: "MonthName", label: "Mês do documento" },
      { name: "SignatureDay", label: "Dia da assinatura" },
      { name: "SignatureYear", label: "Ano de Assinatura" },
    ],
  },
};

export default function App() {
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!selectedForm) return;
  
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
  
    const response = await fetch(
      `${API_URL}/api/pdf/${selectedForm}`,
      {
        method: "POST",
        body: form, 
      }
    );
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedForm}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container sx={{ mt: 5 }}>
      {!selectedForm ? (
        <>
          <Typography variant="h4" gutterBottom>
            Selecione o tipo de documento
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(formConfigs).map(([key, cfg]) => (
              // @ts-ignore
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card>
                  <CardActionArea onClick={() => setSelectedForm(key as FormType)}>
                    <CardContent>
                      <Typography variant="h6">{cfg.label}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            {formConfigs[selectedForm].label}
          </Typography>
          <Grid container spacing={2}>
            {formConfigs[selectedForm].fields.map((field) => (
              // @ts-ignore
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Gerar PDF
          </Button>
          <Button
            sx={{ mt: 3, ml: 2 }}
            onClick={() => {
              setSelectedForm(null);
              setFormData({});
            }}
          >
            Voltar
          </Button>
        </>
      )}
    </Container>
  );
}
