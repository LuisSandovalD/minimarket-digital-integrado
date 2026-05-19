import {
  UserStep,
  CompanyStep,
  BranchStep,
} from "../../components/register/";

export default function RegisterForm({

  step,

  form,

  error,

  handleChange,

  handleSubmit,

}) {

  // ======================================
  // RENDER
  // ======================================

  return (

    <form
      id="register-form"
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ======================================
          STEP 1 — USER
      ====================================== */}

      {step === 1 && (

        <UserStep
          form={form}
          handleChange={handleChange}
        />

      )}

      {/* ======================================
          STEP 2 — COMPANY
      ====================================== */}

      {step === 2 && (

        <CompanyStep
          form={form}
          handleChange={handleChange}
        />

      )}

      {/* ======================================
          STEP 3 — BRANCH
      ====================================== */}

      {step === 3 && (

        <BranchStep
          form={form}
          handleChange={handleChange}
        />

      )}

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            font-medium
            text-red-500
          "
        >

          {error}

        </div>

      )}

    </form>

  );

}