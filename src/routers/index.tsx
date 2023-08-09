/*
 * Copyright 2022 Nightingale Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import _ from 'lodash';

import G6 from '@/pages/G6';


export default function Content() {

  return (
    <div className={`content`}>
      <Switch>
        <Route path='/g6' component={G6} />
      </Switch>
    </div>
  );
}
