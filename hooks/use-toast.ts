"use client"

// Inspired by the react-hot-toast library, with custom tweaks for our app

import * as React from "react"

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
// Keeping toasts visible for quite a while — feel free to adjust as needed
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  // Simple ID generator cycling through MAX_SAFE_INTEGER to avoid overflow
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
    | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
    | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
    | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
    | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Adds a toast to the remove queue after delay, avoiding
