import { useEffect, useState, useRef } from 'react';
import {faTimes, faCheck, faInfoCircle } from '@fortawesome/fontawesome-svg-core';

const usernameRegex = /^[a-zA-Z0-9_-]{4,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

import React from 'react'

function Register() {
  return (
    <div>Register</div>
  )
}

export default Register