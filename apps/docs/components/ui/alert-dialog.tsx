"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AlertDialogContentProps = React.ComponentProps<typeof DialogContent>;

export function AlertDialogContent({
  size = "sm",
  ...props
}: AlertDialogContentProps) {
  return <DialogContent size={size} {...props} />;
}

export const AlertDialog = Dialog;
export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogCancel = DialogClose;
export const AlertDialogAction = DialogClose;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogFooter = DialogFooter;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
