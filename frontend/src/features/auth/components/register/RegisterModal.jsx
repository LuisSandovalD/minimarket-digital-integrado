import {
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  Building2,
  ShieldCheck,
  Store,
} from "lucide-react";

import {
  Modal,
  HeaderModal,
 FooterModal,
} from "@/components/modals";

import {
  ModernButton,
  SubmitButton,
} from "@/components/buttons";

import RegisterForm
from "./RegisterForm";

import useRegisterForm
from "../../hooks/useRegisterForm";

import {
  registerService,
} from "../../services/register.services";

import {
  loginSuccess,
} from "../../store/authActions";

export default function RegisterModal({
  open,
  onClose,
}) {

  // ======================================
  // HOOKS
  // ======================================

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const {

    step,

    form,

    loading,

    setLoading,

    error,

    setError,

    handleChange,

    nextStep,

    prevStep,

    resetForm,

  } = useRegisterForm();

  // ======================================
  // STEPS
  // ======================================

  const steps = [

    {
      id: 1,
      title: "Usuario",
      icon: ShieldCheck,
    },

    {
      id: 2,
      title: "Empresa",
      icon: Building2,
    },

    {
      id: 3,
      title: "Sucursal",
      icon: Store,
    },

  ];

  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError(null);

      setLoading(true);

      try {

        // ======================================
        // PAYLOAD
        // ======================================

        const payload = {

          name:
            form.name,

          email:
            form.email,

          password:
            form.password,

          role:
            form.role,

          phone:
            form.phone,

          plan:
            form.plan,

          company: {

            name:
              form.companyName,

            email:
              form.companyEmail ||
              null,

            phone:
              form.companyPhone ||
              null,

            address:
              form.companyAddress ||
              null,

            ruc:
              form.companyRuc ||
              null,

          },

        };

        // ======================================
        // OPTIONAL BRANCH
        // ======================================

        if (
          form.branchName.trim()
        ) {

          payload.branch = {

            name:
              form.branchName,

            code:
              form.branchCode,

            address:
              form.branchAddress,

            phone:
              form.branchPhone,

            city:
              form.branchCity,

            state:
              form.branchState,

            country:
              form.branchCountry,

          };

        }

        // ======================================
        // REGISTER
        // ======================================

        const response =
          await registerService(
            payload
          );

        // ======================================
        // LOGIN REDUX
        // ======================================

        dispatch(
          loginSuccess(
            response.user
          )
        );

        // ======================================
        // RESET
        // ======================================

        resetForm();

        // ======================================
        // CLOSE MODAL
        // ======================================

        onClose?.();

        // ======================================
        // REDIRECT
        // ======================================

        navigate(
          `/${response.company.slug}/dashboard`
        );

      } catch (err) {

        setError(

          err.response?.data
            ?.message ||

          err.message ||

          "Error al registrarse"

        );

      } finally {

        setLoading(false);

      }

    };

  // ======================================
  // RENDER
  // ======================================

  return (

    <Modal
      open={open}
      onClose={onClose}
      size="lg"
    >

      {/* ======================================
          HEADER
      ====================================== */}

      <HeaderModal
        title="Crear Cuenta"
        subtitle="Configura tu sistema ERP multiempresa"
        icon={ShieldCheck}
        onClose={onClose}
      />

      {/* ======================================
          BODY
      ====================================== */}

      <div className="relative px-8 py-8">

        {/* ======================================
            STEPS
        ====================================== */}

        <div className="mb-10 flex w-full items-center justify-between">

          {steps.map(
            (item, index) => {

              const Icon =
                item.icon;

              const active =
                step >= item.id;

              return (

                <div
                  key={item.id}
                  className="flex flex-1 items-center"
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        transition-all
                        duration-300

                        ${
                          active
                            ? `
                              border-[#274c77]
                              bg-gradient-to-br
                              from-[#274c77]
                              to-[#6096ba]
                              text-white
                              shadow-xl
                            `
                            : `
                              border-[#d7e0e7]
                              bg-white
                              text-[#6096ba]
                            `
                        }
                      `}
                    >

                      <Icon size={22} />

                    </div>

                    <p
                      className="
                        mt-3
                        text-sm
                        font-semibold
                        text-[#274c77]
                      "
                    >

                      {item.title}

                    </p>

                  </div>

                  {index !==
                    steps.length - 1 && (

                    <div
                      className={`
                        mx-4
                        h-1
                        flex-1
                        rounded-full

                        ${
                          step > item.id
                            ? "bg-[#274c77]"
                            : "bg-[#d7e0e7]"
                        }
                      `}
                    />

                  )}

                </div>

              );

            }
          )}

        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <RegisterForm

          step={step}

          form={form}

          error={error}

          handleChange={
            handleChange
          }

          handleSubmit={
            handleSubmit
          }

        />

      </div>

      {/* ======================================
          FOOTER
      ====================================== */}

      <FooterModal>

        <div
          className="
            flex
            w-full
            items-center
            justify-between
          "
        >

          <div
            className="
              text-sm
              font-medium
              text-[#6096ba]
            "
          >

            Paso {step} de 3

          </div>

          <div className="flex items-center gap-3">

            {step > 1 && (

              <ModernButton
                text="Volver"
                variant="outline"
                onClick={prevStep}
              />

            )}

            {step < 3 ? (

              <ModernButton
                text="Continuar"
                onClick={nextStep}
              />

            ) : (

             <SubmitButton
                text={
                  loading
                    ? "Creando cuenta..."
                    : "Finalizar Registro"
                }
                loading={loading}
                disabled={loading}
                onClick={handleSubmit}
              />
            )}

          </div>

        </div>

      </FooterModal>

    </Modal>

  );

}