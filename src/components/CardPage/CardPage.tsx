import React, { ReactNode } from "react";
import styles from "./card.module.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

type Div = React.HTMLAttributes<HTMLDivElement>
interface DivProps extends Div { children: ReactNode }
function wrapDiv(className: string): React.FC<DivProps> {
	const div: React.FC<DivProps> = ({ children, ...props }) => (
	  <div {...props} className={className + (props.className ? " " + props.className : '')}>
		{children}
	  </div>
	);
	return div;
}
type Button = React.ButtonHTMLAttributes<HTMLButtonElement>
interface ButtonProps extends Button { children: ReactNode }
function wrapButton(className: string): React.FC<ButtonProps> {
	const button: React.FC<ButtonProps> = ({ children, ...props }) => (
	  <button {...props} className={className + (props.className ? " " + props.className : '')}>
		{children}
	  </button>
	);
	return button;
}
  
const CardPage = wrapDiv(`${styles.main_container} ${styles.background}`);
const Card = wrapDiv(styles.card);
const Title = wrapDiv(styles.title);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
	placeholder: string;
	id: string;
	options?: RegisterOptions<FieldValues, string>;
}
const Input: React.FC<InputProps> = ({ options, type, className, ...props }) => {
	const { register } = useFormContext();
	if (!props.name) props.name = props.id;
	return (
	  <input 
		{...props}
		type={type || "text"} 
		className={`${styles.input} ${className||''}`}
		{...register(props.id, options)}
		/>
	);
}
const FileInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	accept: string;
	options?: RegisterOptions<FieldValues, string>;
}> = ({options, ...props}) => {
	const { register, watch } = useFormContext();
	const file = watch(props.id) as FileList | undefined;
	if (!props.name) props.name = props.id;
	return (
	  <label className={styles.file_input} htmlFor={props.id}>
		<div className={styles.file_input_button}> Upload </div>
		<span className={styles.file_input_name}>{file && file.length ? file[0].name : "No file selected"}</span>

		<input 
			{...props} 
			type="file" 
			style={{display: "none"}}
			{...register(props.id, options)}/>
	  </label>
	);
}
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	id: string;
	placeholder: string;
	options?: RegisterOptions<FieldValues, string>;
}> = ({options, ...props}) => {
	const { register } = useFormContext();
	if (!props.name) props.name = props.id;
	return (
	  <textarea 
		{...props} 
		className={`${styles.input} ${styles.text_area} ${props.className||''}`}
		{...register(props.id, options)}/>
	);
}
const Password: React.FC<InputProps> = ({ options, className, ...props }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const { register } = useFormContext();
	if (!props.name) props.name = props.id;
	return (
	  <div className={styles.password_container}>
		<input 
		  {...props}
		  type={showPassword ? "text" : "password"}
		  className={`${styles.input} ${styles.password} ${className||''}`}
		  {...register(props.id, options)}
		  />
		{showPassword ? (
		  <BsEyeSlashFill
			className={styles.password_icon} 
			onClick={() => setShowPassword(!showPassword)}
			/>
		) : (
		  <BsFillEyeFill
			className={styles.password_icon}
			onClick={() => setShowPassword(!showPassword)}
			/>
		)}
	  </div>
	);
};
const Dropdown: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { 
	values: string[] 
	id: string
	options?: RegisterOptions<FieldValues, string>;
}> = ({values, options, ...props}) => {
	const { register } = useFormContext();
	if (!props.name) props.name = props.id;
	return (
	  <select 
	  	{...props} 
		{...register(props.id, options) } 
		className={`${styles.dropdown} ${props.className||''}`}>
		{values.map((value, index) => (
		  <option key={index} value={value}>{value}</option>
		))}
	  </select>
	);
}

const Separator: React.FC<{ text?: string }> = ({ text }) => {
	if (!text) return <hr className={styles.separator_line_full} />;
	return (
	  <div className={styles.separator}>
		<hr className={styles.separator_line}/>
		<span className={styles.separator_text}> {text} </span>
		<hr className={styles.separator_line}/>
	  </div>
	);

}
const CardRow = wrapDiv(styles.card_row);

const Label: React.FC<
	React.LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }
> = ({children, className, ...props}) => (
	<label {...props} className={`${styles.label} ${className||''}`}> {children} </label>
);
const BigButton = wrapButton(styles.big_button);
const SmallButton = wrapButton(styles.small_button);
const SideButton: React.FC<ButtonProps & {
	color?: "main" | "gray" | "green" | "blue" | "red" | "yellow";
	side?: "left" | "right";
}> = ({ color, children, ...props }) => {
	let className = (props.className? props.className + " " : '');;
	if (!color || color === "main") className = styles.button_main;
	else if (color === "gray") className = styles.button_gray;
	else if (color === "green") className = styles.button_green;
	else if (color === "blue") className = styles.button_blue;
	else if (color === "red") className = styles.button_red;
	else if (color === "yellow") className = styles.button_yellow; 
	if (props.side === "left") className += " " + styles.button_left;
	else if (props.side === "right") className += " " + styles.button_right;
	if (props.className) className += " " + props.className;
	return (
	  <button {...props} className={`${styles.side_button} ${className}`}>
		{children}
	  </button>
	);
}

export { 
	CardPage,
	Card,
	Title,
	Input,
	FileInput,
	TextArea,
	Password,
	BigButton,
	Separator,
	CardRow,
	SmallButton,
	Dropdown,
	Label,
	SideButton
};