"use client"

import { SellProduct, State } from "@/app/actions";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { SelectCategory } from "../SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../Editor";
import { Submitbutton } from "../SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";

export function SellForm() {
    const initialState: State = { message:"", status: undefined};
    const [state, formAction] = useFormState(SellProduct, initialState);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [images, setImages] = useState<null | string[]>(null);
    const [productFile, setProductFile] = useState<null | string>(null);

    useEffect(() => {
        if(state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error"){
            toast.error(state.message);
        }
    }, [state]);
    return(
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Sell your product with ease</CardTitle>
                <CardDescription>
                    Please try to describe your product in a thorough manner with detailed attention to all aspects for SEO and have a better chance of selling your product. 
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-2">
                    <Label>Product Name:</Label>
                    <Input name="name" type="text" placeholder="Name of your Product" required minLength={3} />
                    {state?.errors?.["name"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Category:</Label>
                    <SelectCategory />
                    {state?.errors?.["category"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["category"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Price:</Label>
                    <Input name="price" type="number" placeholder="$29" required min={1} />
                    {state?.errors?.["price"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Small Summary:</Label>
                    <Textarea name="smallDescription" placeholder="Summarize your product" required minLength={10} />
                    {state?.errors?.["smallDescription"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["smallDescription"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <input 
                        type="hidden"
                        name="description"
                        value={JSON.stringify(json)}
                    />
                    <Label>Description:</Label>
                    <TipTapEditor json={json} setJson={setJson}/>
                    {state?.errors?.["description"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <input 
                        type="hidden"
                        name="images"
                        value={JSON.stringify(images)}
                    />
                    <Label>Product Images:</Label>
                    <UploadDropzone 
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImages(res.map((item) => item.url));
                            toast.success("Your images have been uploaded successfully!")
                        }}
                        onUploadError={(error: Error) => {
                            toast.error("Something went wrong, try again");
                        }}
                    />
                    {state?.errors?.["images"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <input 
                        type="hidden"
                        name="productFile"
                        value={productFile ?? ""}
                    />
                    <Label>Product File:</Label>
                    <UploadDropzone 
                        onClientUploadComplete={(res) => {
                            setProductFile(res[0].url);
                            toast.success("Your Product file has been uploaded successfully!")
                        }}
                        endpoint="productFileUpload"
                        onUploadError={(error: Error) => {
                            toast.error("Something went wrong, try again");
                        }}
                    />
                    {state?.errors?.["productFile"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["productFile"]?.[0]}</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="mt-5">
                <Submitbutton title="Create your Product" />
            </CardFooter>
        </form>
    )
}