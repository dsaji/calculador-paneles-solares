'use client';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import type { CalcResult, PanelsFormValues } from '../types';
import { computePanelsSchema } from '../validation/computePanels.schema';
import TextField from './TextField';
import PanelsDrawer from './PanelsDrawer';
import styles from './PanelsForm.module.css';

const API_URL = 'http://localhost:3000/api/computePanels';

const fields = [
  { name: 'panelHeight', label: 'Altura del panel' },
  { name: 'panelWidth', label: 'Ancho del panel' },
  { name: 'roofHeight', label: 'Altura del techo' },
  { name: 'roofWidth', label: 'Ancho del techo' },
];

export default function PanelsForm() {
  const [result, setResult] = useState<CalcResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (values: PanelsFormValues) => {
    const url = new URL(API_URL);
    url.search = new URLSearchParams(Object.entries(values)).toString();
    setLoading(true);
    setError(null);
    const response = await fetch(url);
    setLoading(false);
    if (!response.ok) {
      setError(new Error('Algo salio mal :c'));
    }
    const data = await response.json();
    setResult(data);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculador de paneles</h1>
      <Formik
        initialValues={{
          panelHeight: '',
          panelWidth: '',
          roofHeight: '',
          roofWidth: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={computePanelsSchema}
      >
        {({ values }) => (
          <>
            <Form className={styles.form}>
              {fields.map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type="number"
                  min={1}
                />
              ))}
              <button type="submit">Calcular</button>
            </Form>
            <div className={styles.resultContainer}>
              {loading ? (
                <div>Cargando…</div>
              ) : error ? (
                <div>{error.message}</div>
              ) : result ? (
                <div>Paneles: {result.count}</div>
              ) : null}
              {result && (
                <PanelsDrawer
                  roofHeight={Number(values.roofHeight)}
                  roofWidth={Number(values.roofWidth)}
                  panels={result.recs}
                />
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

// const roofHeight = Number(values.roofHeight);
// const roofWidth = Number(values.roofWidth);
