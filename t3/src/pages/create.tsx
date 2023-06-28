import CreateNFTCollection from "~/components/CreateNFTCollection";
import CreatePrevisualization from "~/components/CreatePrevisualization";
import { useState } from "react";

const create = () => {
  const [form, setForm] = useState({} as FormCreate);

  return (
    <div className="pb-[8vh]">
      <h1 className="w-full text-center text-4xl font-bold my-10">Create your next NFT</h1>
      <div className="flex flex-wrap w-full justify-center items-center my-5">
        <CreateNFTCollection
          onChangeForm={setForm}
        />
        <CreatePrevisualization
          form={form}
        />
      </div>
    </div>
  );
};
export default create;