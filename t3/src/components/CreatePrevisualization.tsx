import { FC } from "react";

interface Props {
  form: FormCreate,
};

const CreatePrevisualization: FC<Props> = ({ form }) => {
  return (
    <div className="card bg-base-100 shadow-xl max-h-[80vh] mx-8
      max-w-[90vw]
      sm:max-w-[60vw]
      md:max-w-[50vw]
      lg:max-w-[40vw]
      xl:max-w-[30vw]"
    >
      <figure>
        <img src={form.image
          ? URL.createObjectURL(form.image)
          : "images/placeholder.svg"} alt=""
        />
      </figure>
      <div className="p-3 w-full">
        <h2 className="text-2xl font-bold">{form.title}</h2>
        <p className="">{form.description}</p>
        <p className="border rounded px-2 py-1 w-min mt-2">{form.category ?? "Food"}</p>
        {
          form.price && (
            <div className="font-bold">
              <div className="divider"></div>
              <p>Price</p>
              <p className="text-xl">{form.price} EUR</p>
            </div>
          )
        }
      </div>
    </div>
  );
};
export default CreatePrevisualization;