import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: { preflight: false, container: false },
	darkMode: ["class", '[data-theme="dark"]'],
	content: [
		'./src/**/*.html', 
		'./src/**/*.ts', 
		'./src/**/*.tsx', 
		'./blog/**/*.md', 
		'./blog/**/*.mdx',
		'./docs/**/*.mdx',
		'./docs/**/*.md',
	],
	theme: {
    	extend: {
    		typography: {
    			DEFAULT: {
    				css: {
    					maxWidth: '100%'
    				}
    			}
    		},
    		fontFamily: {
    			'display': ['Georgia', 'Times New Roman', 'serif'],
    			'body': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    			'mono': ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))',
                    dark: 'hsl(var(--primary-dark, var(--primary)))',
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: '0',
    			md: '0',
    			sm: '0',
    			none: '0',
    			DEFAULT: '0',
    		},
    		keyframes: {
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			},
    			shine: {
    				'0%': {
    					'background-position': '0% 0%'
    				},
    				'50%': {
    					'background-position': '100% 100%'
    				},
    				to: {
    					'background-position': '0% 0%'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'fade-in-up': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'line-expand': {
    				'0%': {
    					width: '32px'
    				},
    				'100%': {
    					width: '48px'
    				}
    			},
    			'count-up': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(10px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			}
    		},
    		animation: {
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
    			shine: 'shine var(--duration) infinite linear',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    			'line-expand': 'line-expand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    			'count-up': 'count-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    		},
    		transitionTimingFunction: {
    			'professional': 'cubic-bezier(0.16, 1, 0.3, 1)',
    		}
    	}
    },
	plugins: [
		require('@tailwindcss/typography'),
		require("tailwindcss-animate")
	],
}; 