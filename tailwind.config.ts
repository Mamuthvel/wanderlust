
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				booking: {
					blue: '#0071c2',
					yellow: '#febb02',
					lightBlue: '#f2f6fa',
					darkBlue: '#003b95',
					green: '#006600'
				},
				travel: {
					blue: 'hsl(var(--primary))',
					blueGlow: 'hsl(var(--primary-glow))',
					sunset: 'hsl(var(--secondary))',
					ocean: 'hsl(var(--accent))',
					sand: 'hsl(43 74% 66%)',
					coral: 'hsl(16 90% 66%)',
					forest: 'hsl(142 72% 29%)',
					sky: 'hsl(200 94% 86%)',
					purple: 'hsl(270 91% 65%)',
					teal: 'hsl(172 66% 50%)',
					mint: 'hsl(160 84% 39%)',
					lavender: 'hsl(280 69% 88%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)' },
					'50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-3px)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(5px) rotate(-1deg)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 10px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 25px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary-glow) / 0.6)' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in-down': 'slide-in-down 0.4s ease-out',
				'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-in': 'scale-in 0.3s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
