import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Email inválido'),
          password: yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const { email, password } = data;
        await signIn({ email, password });

        push('/dashboard');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          title: 'Erro na autenticação',
          type: 'error',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, push],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Entrar</Button>

          <Link to="/">Esqueci minha senha</Link>
        </Form>

        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
