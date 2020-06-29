import React from 'react';
// TODO тут надо написать фунцию, которая соберет все дефолтные импорты из вложенных папок и экспорнет их

import BubbleLoader from './Atoms/BubbleLoader/BubbleLoader';
import { FormButton, CustomButton } from './Atoms/Button/Button';
import Checkbox from './Atoms/Checkbox/Checkbox';
import Comment from './Atoms/Comment/Comment';
import ErrorPlaceholder from './Atoms/ErrorPlaceholder/ErrorPlaceholder';
import IndexShortPost from './Atoms/IndexShortPost/IndexShortPost';
import IndexShortPostPlaceholder from './Atoms/IndexShortPost/IndexShortPostPlaceholder';
import Input from './Atoms/Input/Input';
import MainLogo from './Atoms/MainLogo/MainLogo';
import PrivateRoute from './Atoms/PrivateRoute/PrivateRoute';
import PublicRoute from './Atoms/PublicRoute/PublicRoute';
import SkeletonSvgTransition from './Atoms/SkeletonSvgTransition/SkeletonSvgTransition';
import Textarea from './Atoms/Textarea/Textarea';
import ThemeChanger from './Atoms/ThemeChanger/ThemeChanger';

export {
    BubbleLoader,
    FormButton,
    CustomButton,
    Checkbox,
    Comment,
    ErrorPlaceholder,
    IndexShortPost,
    IndexShortPostPlaceholder,
    Input,
    MainLogo,
    PrivateRoute,
    PublicRoute,
    SkeletonSvgTransition,
    Textarea,
    ThemeChanger,
};

import Burger from './Molecules/Burger/Burger';
import FieldInput from './Molecules/Field/FieldInput';
import FieldTextarea from './Molecules/Field/FieldTextarea';
import Footer from './Molecules/Footer/Footer';
import Form from './Molecules/Form/Form';
import PreviewArticle from './Molecules/PreviewArticles/PreviewArticle';
import Profile from './Molecules/Profile/Profile';

export { Burger, FieldInput, FieldTextarea, Footer, Form, PreviewArticle, Profile };

import Article from './Organisms/Article/Article';
import CommentForm from './Organisms/CommentForm/CommentForm';
import CommentLenta from './Organisms/CommentLenta/CommentLenta';
import CreateArticleForm from './Organisms/CreateArticleForm/CreateArticleForm';
import Feed from './Organisms/Feed/Feed';
import RegisterForm from './Organisms/RegisterForm/RegisterForm';
import Sign_InForm from './Organisms/Sign_InForm/Sign_InForm';
import ValidateForm from './Organisms/ValidableForm/ValidateForm';

export { Article, CommentForm, CommentLenta, CreateArticleForm, Feed, RegisterForm, Sign_InForm, ValidateForm };
