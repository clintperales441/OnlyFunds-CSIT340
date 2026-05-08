import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management
 * Handles: field changes, validation, form submission, error tracking
 */
export const useForm = (initialValues, onSubmit, validate) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Run validation if provided
      const newErrors = validate ? validate(formData) : {};
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          await onSubmit(formData);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }
      setIsSubmitting(false);
    },
    [formData, onSubmit, validate]
  );

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormData,
  };
};
