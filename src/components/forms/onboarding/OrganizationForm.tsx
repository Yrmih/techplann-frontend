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

// Componentes customizados, Schemas, Stores e Services
import { NextButton } from "../../ui/custom/NextButton";
import {
  organizationStepOneSchema,
  type OrganizationStepOneData,
} from "@/lib/validators/schema";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { onboardingService } from "@/services/onboarding";
import { BRAZIL_STATES } from "@/lib/constants/brazil-states";

// Interface ATUALIZADA: Recebe o onboardingId como Prop obrigatória
interface OrganizationFormProps {
  onboardingId: string;
  onNext: () => void;
}

export const OrganizationForm = ({
  onboardingId,
  onNext,
}: OrganizationFormProps) => {
  // Usamos a store apenas para SALVAR os IDs gerados pelo backend
  const { setTenantAndOrg } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationStepOneData>({
    resolver: zodResolver(organizationStepOneSchema),
  });

  // FUNÇÃO REESTRUTURADA: Limpa os dados antes de enviar para a API
  const onSubmit = async (data: OrganizationStepOneData) => {
    try {
      console.log("🚀 Sanitizando dados e salvando com ID:", onboardingId);

      // 💡 LIMPEZA: Remove caracteres não numéricos para bater com o DTO do Back-end
      const cleanData = {
        ...data,
        cnpj: data.cnpj.replace(/\D/g, ""),
        cep: data.cep.replace(/\D/g, ""),
        telefone: data.telefone?.replace(/\D/g, ""),
        celular: data.celular.replace(/\D/g, ""),
      };

      // 1. Chamada ao service com dados sanitizados
      const response = await onboardingService.saveOrganization(
        onboardingId,
        cleanData
      );

      // 2. Persiste tenantId e organizationId na Store
      setTenantAndOrg(response.tenantId, response.organizationId);

      console.log("✅ Empresa registrada com sucesso no PostgreSQL!");

      // 3. Transição para o Step 2
      if (typeof onNext === "function") {
        onNext();
      }
    } catch (error) {
      console.error("❌ Erro ao registrar empresa:", error);
    }
  };

  const inputStyles = (errorField: FieldError | undefined) =>
    `
  bg-white border-gray-200 transition-all text-sm
  hover:border-[#10b981]
  outline-none
  focus-visible:outline-none
  focus-visible:ring-1 
  focus-visible:ring-[#10b981] 
  focus-visible:border-[#10b981]
  focus-visible:ring-offset-0
  ${errorField ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500" : ""}
`
      .replace(/\s+/g, " ")
      .trim();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Empresa</h2>
        <p className="text-sm text-gray-500 mt-1">
          Informe os dados da sua empresa para o TechPlann
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Dados de Identificação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Razão Social <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("razaoSocial")}
              placeholder="Razão social"
              maxLength={100}
              className={inputStyles(errors.razaoSocial)}
            />
            {errors.razaoSocial && (
              <p className="text-xs text-red-500">
                {errors.razaoSocial.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Nome Fantasia
            </Label>
            <Input
              {...register("nomeFantasia")}
              placeholder="Nome fantasia"
              maxLength={100}
              className={inputStyles(errors.nomeFantasia)}
            />
          </div>
        </div>

        {/* Dados Fiscais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              CNPJ <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("cnpj")}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className={inputStyles(errors.cnpj)}
            />
            {errors.cnpj && (
              <p className="text-xs text-red-500">{errors.cnpj.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Inscrição Estadual
            </Label>
            <Input
              {...register("inscricaoEstadual")}
              placeholder="IE"
              maxLength={20}
              className={inputStyles(errors.inscricaoEstadual)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Inscrição Municipal
            </Label>
            <Input
              {...register("inscricaoMunicipal")}
              placeholder="IM"
              maxLength={20}
              className={inputStyles(errors.inscricaoMunicipal)}
            />
          </div>
        </div>

        {/* Canais de Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="contato@empresa.com"
              maxLength={100}
              className={inputStyles(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Telefone
            </Label>
            <Input
              {...register("telefone")}
              placeholder="(00) 0000-0000"
              maxLength={14}
              className={inputStyles(errors.telefone)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Celular</Label>
            <Input
              {...register("celular")}
              placeholder="(00) 00000-0000"
              maxLength={15}
              className={inputStyles(errors.celular)}
            />
          </div>
        </div>

        <hr className="border-gray-100 my-8" />

        {/* Localização */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">CEP</Label>
              <Input
                {...register("cep")}
                placeholder="00000-000"
                maxLength={9}
                className={inputStyles(errors.cep)}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Endereço
              </Label>
              <Input
                {...register("endereco")}
                placeholder="Logradouro..."
                maxLength={150}
                className={inputStyles(errors.endereco)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Número
              </Label>
              <Input
                {...register("numero")}
                placeholder="Nº"
                maxLength={10}
                className={inputStyles(errors.numero)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Complemento
              </Label>
              <Input
                {...register("complemento")}
                placeholder="Ex: Sala 10"
                maxLength={50}
                className={inputStyles(errors.complemento)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Bairro
              </Label>
              <Input
                {...register("bairro")}
                placeholder="Bairro"
                maxLength={50}
                className={inputStyles(errors.bairro)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Cidade
              </Label>
              <Input
                {...register("cidade")}
                placeholder="Cidade"
                maxLength={50}
                className={inputStyles(errors.cidade)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Estado
              </Label>
              <Select onValueChange={(v) => setValue("estado", v)}>
                <SelectTrigger
                  className={`bg-white border-gray-200 focus:ring-[#10b981] focus:border-[#10b981] ${errors.estado ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {BRAZIL_STATES.map((estado) => (
                    <SelectItem key={estado.value} value={estado.value}>
                      {estado.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.estado && (
                <p className="text-xs text-red-500">{errors.estado.message}</p>
              )}
            </div>
          </div>
        </div>

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