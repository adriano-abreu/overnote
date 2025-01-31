import * as ToolbarPrimitive from '@radix-ui/react-toolbar'

export function Toolbar(props: ToolbarPrimitive.ToolbarProps) {
  return (
    <ToolbarPrimitive.Toolbar
      {...props}
      className="flex w-full border border-input min-w-max rounded-md bg-transparent p-2"
    />
  )
}

export function ToolbarToggleGroup(
  props:
    | ToolbarPrimitive.ToolbarToggleGroupSingleProps
    | ToolbarPrimitive.ToolbarToggleGroupMultipleProps,
) {
  return (
    <ToolbarPrimitive.ToolbarToggleGroup
      {...props}
      className="flex gap-1 items-center"
    />
  )
}

export function ToolbarToggleItem(
  props: ToolbarPrimitive.ToolbarToggleItemProps,
) {
  return (
    <ToolbarPrimitive.ToolbarToggleItem
      {...props}
      className="ml-05 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-xs leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-black data-state=on:bg-violet5 data-[state=on]:bg-black data-[state=on]:text-white"
    />
  )
}

export function ToolbarSeparator(
  props: ToolbarPrimitive.ToolbarSeparatorProps,
) {
  return (
    <ToolbarPrimitive.ToolbarSeparator
      {...props}
      className="mx-2 w-px bg-zinc-300"
    />
  )
}

export function ToolbarLink(props: ToolbarPrimitive.ToolbarLinkProps) {
  return <ToolbarPrimitive.ToolbarLink {...props} />
}

export function ToolbarButton(props: ToolbarPrimitive.ToolbarButtonProps) {
  return (
    <ToolbarPrimitive.ToolbarButton
      {...props}
      style={{ marginLeft: 'auto' }}
      className="inline-flex h-[25px] flex-shrink-0 bg-black flex-grow-0 basis-auto items-center justify-center rounded px-2 leading-none text-white hover:opacity-80"
    />
  )
}
