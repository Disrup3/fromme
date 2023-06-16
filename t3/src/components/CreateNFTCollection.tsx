import { useForm, SubmitHandler } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone";
import { Dispatch, FC, SetStateAction, useMemo, useEffect } from "react";
import { NFTStorage } from "nft.storage";

interface Props {
  onChangeForm: Dispatch<SetStateAction<FormCreate>>,
}

const CreateNFTCollection: FC<Props> = ({ onChangeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormCreate>();

  watch(data => {
    onChangeForm(data);
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    // TODO: OJO --> Lo ponga como lo ponga en .env me salta missing token
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY4ZGUxM2E5OUE0YTkyRDdEMTFDNDMxQ0IzNDc2NDZBOWJCZkRCMzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4Njc3MjAwNjM4OCwibmFtZSI6ImZyb21tZS1kZXYifQ.C-6OrEBBh64q1IowVo_bfRphCq5qo388DMwEcoyfyjg";
    console.log("token", token);
    try {
      const metadata = await new NFTStorage({ token }).store({
        name: data.titulo,
        description: data.descripcion,
        image: data.imagen,
      });
      console.log({ "IPFS URL for the metadata": metadata.url });
      console.log({ "metadata.json contents": metadata.data });
      console.log({
        "metadata.json contents with IPFS gateway URLs": metadata.embed(),
      });
    } catch (err: any) {
      console.log(err);
    }
    // try {
    //   const response = await axios.post(
    //     "https://api.nft.storage/store",
    //     {
    //       file: data.imagen,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${process.env.NFT_STORAGE_KEY}`,
    //       },
    //     }
    //   );
    //   console.log("response", response);
    //   return response;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // console.log(watch("titulo")); // watch input value by passing the name of it

  // ----------------------DROPZONE----------------------
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { "image/*": [] } });


  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#363944",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex min-w-[300px] flex-col items-center gap-3 bg-base-100 p-4 text-primary"
    >
      {/* Título */}
      <div className="flex w-full flex-col">
        <label>Título:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-accent">Required field</span>
        )}
      </div>

      {/* Descripción */}
      <div className="flex w-full flex-col">
        <label>Description:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-accent">Required field</span>
        )}
      </div>

      {/* Imagen */}
      <div className="flex w-full flex-col">
        <label>Image:</label>
        <Dropzone
          onDrop={(acceptedFiles) => {
            register("image",{ required: true, value: acceptedFiles[0] });
            setValue("image", acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ style })}>
                <input
                  {...getInputProps()}
                />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      {/* Categoría */}
      <div className="flex w-full flex-col">
        <label>Category:</label>
        <select
          {...register("category")}
          className="input-bordered input w-full"
        >
          <option value="Food">Food</option>
          <option value="Party">Party</option>
          <option value="Shows">Shows</option>
        </select>
        {errors.category && (
          <span className="text-accent">Required field</span>
        )}
      </div>
      {/* Precio */}
      <div className="flex w-full flex-col">
        <label>Price:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("price", { required: true })}
        />
        {errors.description && (
          <span className="text-accent">Required field</span>
        )}
      </div>
      <input type="submit" className="cursor-pointer" />
    </form>
  );
};
export default CreateNFTCollection;