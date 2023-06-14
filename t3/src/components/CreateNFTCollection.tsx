import { useForm, SubmitHandler } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone";
import { useEffect, useMemo } from "react";

type Inputs = {
  titulo: string;
  descripcion: string;
  imagen: File; // TODO: puede que haya que revisar
  categoria: string;
};

const CreateNFTCollection = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log("data", data); //TODO: Mirar esto bien

  console.log(watch("titulo")); // watch input value by passing the name of it
  console.log(watch("imagen")); // watch input value by passing the name of it

  // ----------------------DROPZONE----------------------
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

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { "image/*": [] } });

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  // useEffect(() => {
  //   register("imagen", { value: acceptedFiles[0] });
  //   console.log("files", acceptedFiles);
  // }, [acceptedFiles]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex w-full flex-col items-center gap-3 bg-base-100 p-4 text-primary"
    >
      {/* Título */}
      <div className="flex w-full flex-col">
        <label>Título:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("titulo", { required: true })}
        />
        {errors.titulo && (
          <span className="text-accent">Campo obligatorio</span>
        )}
      </div>

      {/* Descripción */}
      <div className="flex w-full flex-col">
        <label>Descripción:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("descripcion", { required: true })}
        />
        {errors.descripcion && (
          <span className="text-accent">Campo obligatorio</span>
        )}
      </div>

      {/* Imágen */}
      <div className="flex w-full flex-col">
        <label>Imágen:</label>
        <Dropzone
          onDrop={(acceptedFiles) =>
            register("imagen", { required: true, value: acceptedFiles[0] })
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ style })}>
                <input
                  // type="file"
                  {...getInputProps()}
                />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        {/* {errors.imagen && (
          <span className="text-accent">Campo obligatorio</span>
        )} */}
      </div>

      {/* Categoría */}
      <div className="flex w-full flex-col">
        <label>Categoría:</label>
        <select
          {...register("categoria")}
          className="input-bordered input w-full"
        >
          <option value="Comida">Comida</option>
          <option value="Fiesta">Fiesta</option>
          <option value="Espectáculo">Espectáculo</option>
        </select>
        {errors.categoria && (
          <span className="text-accent">Campo obligatorio</span>
        )}
      </div>

      <input type="submit" className="cursor-pointer" />
    </form>
  );
};
export default CreateNFTCollection;
