import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {  Link, router } from 'expo-router';
import { z } from 'zod';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(50, 'La contraseña es demasiado larga'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: SignUpForm) => {

    try {
      setLoading(true);
      setError(null);
      
      const { error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name
          }
        }
      });

      if (signupError) {
        throw signupError;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (loginError) {
        throw loginError;
      }


    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>¡Registra tu cuenta!</Text>
        <Text style={styles.subtitle}>
          Hola, debes iniciar sesión primero para poder usar la aplicación y disfrutar de todas las funciones en Taskit
        </Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Leandro"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="leandro@gmail.com"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor="#999"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
          />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
                Al crear una cuenta, aceptas nuestros{' '}
                <Text style={styles.linkText}>Términos y Condiciones</Text>
            </Text>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              Registrarse
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿Ya tienes una cuenta?{' '}
              <Link href="/signin">
                <Text style={styles.linkText}>Iniciar sesión</Text>
              </Link>
            </Text>
          </View>
        </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: "RobotoBold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#666",
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    fontFamily: 'Roboto',
    color: '#666',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'RobotoBold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Roboto',
    color: '#666',
  },
  linkText: {
    color: '#6366f1',
    fontFamily: 'RobotoBold',
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});
