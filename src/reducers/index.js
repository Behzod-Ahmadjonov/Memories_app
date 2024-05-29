import { combineReducers } from '@reduxjs/toolkit';

import posts from './posts';
import auth from './auth';

export const reducer = combineReducers({ posts, auth });