import React from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';
import { fieldNames } from './enumerations';
import { signInValidationSchema } from './validation';
import { useMutation } from '@apollo/react-hooks';
import ErrorMessage from 'components/ErrorMessage';
import { CREATE_USER, GET_USERS } from './gql';

import {
  AuthWrapper,
  AuthLogo,
  AuthFormContainer,
  AuthFormTitle,
  AuthInput,
  AuthTextStyle,
  AuthSignUpSignIn,
  AuthButton,
  AuthButtonArrow,
} from './styled';

const SignUp: React.FC = () => {
  const { register, handleSubmit, setValue, errors } = useForm({
    validationSchema: signInValidationSchema,
  });

  const [createUsers, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const onSubmit = handleSubmit((data: any) => {
    alert(JSON.stringify(data));
  });

  const onFormSubmit = (values: any) => {
    createUsers({
      variables: {
        login: values[fieldNames.email],
        name: values[fieldNames.name],
        password: values[fieldNames.password],
      },
    });
  };

  return (
    <AuthWrapper>
      <AuthLogo />
      <AuthFormContainer style={{ top: '80px' }} onSubmit={handleSubmit(onFormSubmit)}>
        <AuthFormTitle>Sign up</AuthFormTitle>
        <AuthInput
          ref={register}
          placeholder="E-Mail"
          onChange={e => setValue('login', e.target.value)}
          name={fieldNames.email}
        />
        <ErrorMessage errors={errors} name={fieldNames.email} />
        <AuthInput
          ref={register}
          placeholder="Name"
          onChange={e => setValue('name', e.target.value)}
          name={fieldNames.name}
        />
        <ErrorMessage errors={errors} name={fieldNames.name} />
        <AuthInput
          ref={register}
          placeholder="password"
          onChange={e => setValue('password', e.target.value)}
          name={fieldNames.password}
        />
        <ErrorMessage errors={errors} name={fieldNames.password} />
        <AuthInput name="confirmPassword" ref={register} placeholder="Confirm password" />
        <AuthSignUpSignIn>
          {/* <Link to="/SignUp"> */}
          <AuthTextStyle>Sign up</AuthTextStyle>
          {/* </Link> */}
          {/* <Link to="/ResetPassword"> */}
          <AuthButton type="submit">
            <AuthTextStyle>Sign in</AuthTextStyle>
            <AuthButtonArrow />
          </AuthButton>
          {/* </Link> */}
        </AuthSignUpSignIn>
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default SignUp;
