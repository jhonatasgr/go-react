import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const buttonVariants = cva(
  `px-3 py-1.5 gap-1.5 flex items-center font-medium text-sm rounded-lg 
  transition-colors`,
  {
    variants: {
      variant: {
        primary: 'bg-orange-400 text-orange-950 hover:bg-orange-500',
        secondary: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-500',
        text: 'gap-2 mt-3 px-0 py-0',
      },
      liked: {
        true: 'text-orange-400 hover:text-orange-500',
        false: 'text-zinc-400 hover:text-zinc-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, liked, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, liked, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
