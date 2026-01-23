"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "react-hook-form";
// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Componentes customizados e Schemas
import { NextButton } from "./NextButton";
import { organizationStepOneSchema, type OrganizationStepOneData } from "@/lib/validators/schema";

export const OrganizationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationStepOneData>({
    resolver: zodResolver(organizationStepOneSchema),
  });

  const onSubmit = (data: OrganizationStepOneData) => {
    console.log("Dados do Registro - Empresa (Step 1):", data);
  };

  // Estilo base para inputs com foco verde e tratamento de erro
  

// Agora tipamos a função corretamente
const inputStyles = (errorField: FieldError | undefined) => `
  bg-white border-gray-200 transition-all text-sm
  hover:border-[#10b981]
  
  /* Remove o ring/sombra padrão e aplica o seu */
  outline-none
  focus-visible:outline-none
  focus-visible:ring-1 
  focus-visible:ring-[#10b981] 
  focus-visible:border-[#10b981]
  focus-visible:ring-offset-0
  
  ${errorField ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500" : ""}
`.replace(/\s+/g, ' ').trim(); // Limpa espaços extras

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Empresa</h2>
        <p className="text-sm text-gray-500 mt-1">Informe os dados da sua empresa</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Bloco: Identificação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium  text-gray-700">Razão Social <span className="text-red-500">*</span></Label>
            <Input {...register("razaoSocial")} placeholder="Razão social da empresa" className={inputStyles(errors.razaoSocial)} />
            {errors.razaoSocial && <p className="text-xs text-red-500">{errors.razaoSocial.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Nome Fantasia</Label>
            <Input {...register("nomeFantasia")} placeholder="Nome fantasia" className={inputStyles(undefined)} />
          </div>
        </div>

        {/* Bloco: Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">CNPJ <span className="text-red-500">*</span></Label>
            <Input {...register("cnpj")} placeholder="00.000.000/0000-00" className={inputStyles(errors.cnpj)} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Inscrição Estadual</Label>
            <Input {...register("inscricaoEstadual")} placeholder="Inscrição estadual" className={inputStyles(undefined)} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Inscrição Municipal</Label>
            <Input {...register("inscricaoMunicipal")} placeholder="Inscrição municipal" className={inputStyles(undefined)} />
          </div>
        </div>

        {/* Bloco: Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></Label>
            <Input {...register("email")} placeholder="empresa@email.com" className={inputStyles(errors.email)} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Telefone</Label>
            <Input {...register("telefone")} placeholder="(00) 0000-0000" className={inputStyles(undefined)} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Celular</Label>
            <Input {...register("celular")} placeholder="(00) 00000-0000" className={inputStyles(undefined)} />
          </div>
        </div>

        {/* LINHA DIVISORA ANTES DE ENDEREÇO (Conforme Figma image_1eb9a5) */}
        <hr className="border-gray-100 my-8" />

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Endereço</h3>
          
          {/* Grid Endereço Linha 1: CEP (1/4), Endereço (2/4), Número (1/4) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">CEP</Label>
              <Input {...register("cep")} placeholder="00000-000" className={inputStyles(undefined)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-gray-700">Endereço</Label>
              <Input {...register("endereco")} placeholder="Rua, Avenida..." className={inputStyles(undefined)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Número</Label>
              <Input {...register("numero")} placeholder="123" className={inputStyles(undefined)} />
            </div>
          </div>

          {/* Grid Endereço Linha 2: Complemento, Bairro, Cidade, Estado (Todos alinhados) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Complemento</Label>
              <Input {...register("complemento")} placeholder="Sala, Andar..." className={inputStyles(undefined)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Bairro</Label>
              <Input {...register("bairro")} placeholder="Bairro" className={inputStyles(undefined)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Cidade</Label>
              <Input {...register("cidade")} placeholder="Cidade" className={inputStyles(undefined)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Estado</Label>
              <Select onValueChange={(v) => setValue("estado", v)}>
                <SelectTrigger className="bg-white border-gray-200 focus:ring-[#10b981] focus:border-[#10b981]">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="PA">PA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* LINHA DIVISORA APÓS ÚLTIMOS CAMPOS (Conforme Figma) */}
        <hr className="border-gray-100 my-8" />

        <NextButton 
          onBack={() => window.history.back()} 
          nextLabel="Próximo" 
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};