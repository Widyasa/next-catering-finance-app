'use client'
import { useRef } from "react";
import { productStore } from "@/stores/productStore";
import { createOrderSchema } from "@/requests/order/create";
import { Control, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CurrencyInput from "react-currency-input-field";
import { formatRupiah } from "@/utils/currency";

type OrderDetailProps = {
    control: Control<z.infer<typeof createOrderSchema>>;
};

export function OrderDetails({ control }: OrderDetailProps) {
    const { products, product } = productStore();
    const { setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "p_order_details",
    });

    const watchedOrderDetails = useWatch({
        control,
        name: "p_order_details",
    });

    const lastUpdatedIndex = useRef<number | null>(null);

    return (
        <>
            <div className="flex justify-between mt-10 items-center">
                <FormLabel className={'text-2xl'}>Order Details</FormLabel>
                <Button type="button" onClick={() => append({ product_id: "", quantity: 1, price: 0 })}>+</Button>
            </div>
            {fields.map((field, index) => {
                const selectedProduct = products.find(p => p.product_id === watchedOrderDetails?.[index]?.product_id);
                const quantity = watchedOrderDetails?.[index]?.quantity || 1;
                const calculatedPrice = selectedProduct ? selectedProduct.price * quantity : 0;
                return (
                    <div key={field.id}>
                        <FormItem key={field.id} className="flex gap-3 items-end w-full">
                            <FormField
                                control={control}
                                name={`p_order_details.${index}.product_id`}
                                render={({ field }) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Product</FormLabel>
                                        <Select
                                            onValueChange={async (value) => {
                                                field.onChange(value);
                                                lastUpdatedIndex.current = index;
                                                if (product) {
                                                    setValue(`p_order_details.${index}.price`, product.price * quantity);
                                                }
                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih Produk" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {products.map(({ product_id, product_name, price }) => (
                                                    <SelectItem key={product_id!} value={product_id!}>
                                                        {product_name} - {formatRupiah(price)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                                type="number"
                                                placeholder="Masukkan jumlah..."
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Math.max(Number(e.target.value) || 1, 1);
                                                    field.onChange(value);
                                                    if (selectedProduct) {
                                                        setValue(`p_order_details.${index}.price`, selectedProduct.price * value);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`p_order_details.${index}.price`}
                                render={() => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <CurrencyInput
                                                placeholder="Insert price..."
                                                className="input-style"
                                                decimalsLimit={0}
                                                prefix="Rp "
                                                value={calculatedPrice}
                                                allowNegativeValue={false}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" onClick={() => remove(index)}>-</Button>
                        </FormItem>
                    </div>
                );
            })}
        </>
    );
}
