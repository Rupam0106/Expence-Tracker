import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <>
      <h1 className="flex justify-center rounded-full text-3xl font-bolt bg-slate-600 text-white p-7">
        Add Your Expenses Here...
      </h1>
      <div className="container flex justify-center p-5">
        <form className="bg-[#048191] rounded-lg p-6"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <div className="m-3">
            <label htmlFor="description" className="">
              Description
            </label>
            <input
              {...register("description")}
              id="description"
              type="text"
              className="rounded-lg ml-2 border-2 border-black-600"
            />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}
          </div>
          <div className="m-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              type="number"
              className="rounded-lg ml-8 border-2 border-black-600"
            />
            {errors.amount && (
              <p className="text-red-600">{errors.amount.message}</p>
            )}
          </div>
          <div className="m-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              {...register("category")}
              id="category"
              className="form-select p-1 ml-7 rounded-lg"
            >
              <option value="">All Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600">{errors.category.message}</p>
            )}
          </div>
          <button className="p-2 bg-yellow-900 text-gray-200 rounded-lg ml-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
