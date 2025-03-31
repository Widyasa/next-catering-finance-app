'use client'
import { Control, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CurrencyInput from "react-currency-input-field";
import {detailOrderSchema} from "@/requests/order/detail";

type OrderDetailProps = {
    control: Control<z.infer<typeof detailOrderSchema>>;
};

export function DetailOrderDetails({ control }: OrderDetailProps) {
    const { fields } = useFieldArray({
        control,
        name: "p_order_details",
    });


    return (
        <>
            <div className="flex justify-between mt-10 items-center">
                <FormLabel className={'text-2xl'}>Order Details</FormLabel>
            </div>
            {fields.map((field, index) => {
                return (
                    <div key={field.id}>
                        <FormItem key={field.id} className="flex gap-3 items-end w-full">
                            <FormField
                                control={control}
                                name={`p_order_details.${index}.product_name`}
                                render={({ field }) => (
                                    <FormItem  className={'w-full'}>
                                        <FormLabel>Product</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                type="text"
                                                placeholder="Masukkan product..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`p_order_details.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem  className={'w-full'}>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                type="number"
                                                placeholder="Masukkan jumlah..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`p_order_details.${index}.price`}
                                render={({ field }) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Harga</FormLabel>
                                        <FormControl>
                                            <CurrencyInput
                                                disabled={true}
                                                id="price"
                                                placeholder="Insert price..."
                                                className="input-style w-full"
                                                decimalsLimit={0}
                                                prefix="Rp "
                                                value={field.value ?? 0}
                                                onValueChange={(value) => field.onChange(value ? Number(value) : 0)}
                                                allowNegativeValue={false}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FormItem>
                    </div>
                );
            })}
        </>
    );
}
