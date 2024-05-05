import { useField } from 'formik';
import styles from './TextField.module.css';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function TextField({ label, ...props }: TextFieldProps) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      <label>
        {label}:
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
}
