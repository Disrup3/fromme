/** eslint-disable */
import { useForm, SubmitHandler } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { NFTStorage } from "nft.storage";
import useNftfactoryContract from "../smart-contracts/hooks/create";

interface Props {
  onChangeForm: Dispatch<SetStateAction<FormCreate>>;
}

type styleType = {
  borderColor: string;
  flex: number;
  display: string;
  alignItems: string;
  padding: string;
  borderWidth: number;
  borderRadius: number;
  borderStyle: string;
  backgroundColor: string;
  color: string;
  outline: string;
  transition: string;
};

const CreateNFTCollection: FC<Props> = ({ onChangeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormCreate>();

  const [invalidImage, setInvalidImage] = useState<boolean>(false);
  const [tokenUri, setTokenUri] = useState({});

  const {
    // Web hook para interactuar con el contrato
    write,
    isLoading,
    changeIsLoading,
  } = useNftfactoryContract({
    _tokenURI: "",
    _feeNumerator: BigInt(0),
    onSuccessfulCreateNFT: () => {
      setInvalidImage(false);
    },
  });

  watch((data) => {
    // Envia el form a create.tsx cada vez que hay un cambio
    onChangeForm(data);
  });

  const onSubmit: SubmitHandler<FormCreate> = async (data) => {
    const token = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || "";
    try {
      const uriJson = {
        name: data.title!,
        description: data.description!,
        image: data.image!,
      };
      setInvalidImage(false);

      const metadata = await new NFTStorage({ token }).store(uriJson);
      setTokenUri(metadata);
      console.log({ "IPFS URL for the metadata": metadata.url });
      console.log({ "metadata.json contents": metadata.data });
      console.log({
        "metadata.json contents with IPFS gateway URLs": metadata.embed(),
      });
      console.log("tokenUri", tokenUri);
      write?.({ args: [metadata.url, 1100] });
    } catch (err: any) {
      console.log(err);
    }
  };

  // ----------------------DROPZONE---------------------- //
  const { isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "image/*": [] },
  });

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

  const style = useMemo(
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
      onSubmit={handleSubmit((data) => {
        if (data.image) {
          setInvalidImage(true);
        }
        changeIsLoading(true);
        onSubmit(data);
      })}
      className="mb-[7vh] flex min-w-[300px] flex-col items-center gap-3 bg-base-100 p-4 text-primary lg:mb-4"
    >
      {/* Título */}
      <div className="flex w-full flex-col">
        <label>Título:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="text-accent">Required field</span>}
      </div>
      {/* Descripción */}
      <div className="flex w-full flex-col">
        <label>Description:</label>
        <input
          type="text"
          className="input-bordered input w-full"
          {...register("description", { required: false })}
        />
        {errors.description && (
          <span className="text-accent">Required field</span>
        )}
      </div>
      <div className="flex w-full flex-col">
        <label>Image:</label>
        <Dropzone
          onDrop={(acceptedFiles) => {
            register("image", { required: true, value: acceptedFiles[0] });
            setValue("image", acceptedFiles[0]);
            setInvalidImage(false);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              {/**@ts-ignore */}
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        {invalidImage === true ? (
          <p className="text-red-500">Required field</p>
        ) : (
          <></>
        )}
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
        {errors.category && <span className="text-accent">Required field</span>}
      </div>
      {/* Royalties */}
      <div className="flex w-full flex-col">
        <label>Royalties:</label>
        <input
          type="number"
          className="input-bordered input w-full"
          {...register("royalties", { required: true, min: 0, max: 25 })}
        />
        {errors.royalties && (
          <span className="text-accent">Invalid royalties</span>
        )}
      </div>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <input type="submit" className="cursor-pointer" />
      )}
    </form>
  );
};
export default CreateNFTCollection;
