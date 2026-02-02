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

// Interface para aceitar a função onNext do componente pai
interface OrganizationFormProps {
  onNext: () => void;
}

export const OrganizationForm = ({ onNext }: OrganizationFormProps) => {
  // Pegamos o onboardingId e a função de salvar IDs do Zustand
  const { onboardingId, setTenantAndOrg } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationStepOneData>({
    resolver: zodResolver(organizationStepOneSchema),
  });

  // Função que realmente envia os dados para o seu NestJS
  const onSubmit = async (data: OrganizationStepOneData) => {
    try {
      if (!onboardingId) {
        console.error("ID de Onboarding não encontrado. Inicie o fluxo primeiro.");
        return;
      }

      // 1. Chamada ao service tipado (POST /onboarding/:id/organization)
      const response = await onboardingService.saveOrganization(onboardingId, data);
      
      // 2. Salva tenantId e organizationId no Zustand/LocalStorage automaticamente
      setTenantAndOrg(response.tenantId, response.organizationId);

      // 3. Em vez de router.push, chamamos o onNext para mudar o Step no componente pai
      onNext();
    } catch (error) {
      console.error("Erro ao registrar empresa no TechPlann:", error);
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
          Informe os dados da sua empresa
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Bloco: Identificação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium  text-gray-700">
              Razão Social <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("razaoSocial")}
              placeholder="Razão social da empresa"
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
              className={inputStyles(errors.nomeFantasia)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              CNPJ <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("cnpj")}
              placeholder="00.000.000/0000-00"
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
              placeholder="Inscrição estadual"
              className={inputStyles(errors.inscricaoEstadual)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Inscrição Municipal
            </Label>
            <Input
              {...register("inscricaoMunicipal")}
              placeholder="Inscrição municipal"
              className={inputStyles(errors.inscricaoMunicipal)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("email")}
              placeholder="empresa@email.com"
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
              className={inputStyles(errors.telefone)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Celular</Label>
            <Input
              {...register("celular")}
              placeholder="(00) 00000-0000"
              className={inputStyles(errors.celular)}
            />
          </div>
        </div>

        <hr className="border-gray-100 my-8" />

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Endereço</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">CEP</Label>
              <Input
                {...register("cep")}
                placeholder="00000-000"
                className={inputStyles(errors.cep)}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Endereço
              </Label>
              <Input
                {...register("endereco")}
                placeholder="Rua, Avenida..."
                className={inputStyles(errors.endereco)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Número
              </Label>
              <Input
                {...register("numero")}
                placeholder="123"
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
                placeholder="Sala, Andar..."
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
                className={inputStyles(errors.cidade)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Estado
              </Label>
              <Select onValueChange={(v) => setValue("estado", v)}>
                <SelectTrigger className={`bg-white border-gray-200 focus:ring-[#10b981] focus:border-[#10b981] ${errors.estado ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC">Acre</SelectItem>
                  <SelectItem value="PA">Pará</SelectItem>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
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