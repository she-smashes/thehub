/**
 * @author Sandhya
 * @name Login
 * @desc This component renders the login page
 */

import React from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const CreateInitiativeForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  pastDateCheck,
  currentDate= new Date(),
  totalParticipants,
  onParticipantDropDownChange

}) => (
  <Card className="container create-initiative-page">
  <form onSubmit={onSubmit}>
      <h2 className="card-heading">Create Initiative Form</h2>
      <div className="field-line">
        <TextField
          floatingLabelText="Initiative Name"
          name="initiativeName"
          onChange={onChange}
          value={user.initiativeName}
          errorText={errors.initiativeName}
        />
      </div>
      <div>
        <DatePicker hintText="Initiative start date" 
        shouldDisableDate={pastDateCheck(currentDate)}/>
      </div>
      <div>
        <DatePicker hintText="Initiative end date" 
        shouldDisableDate={pastDateCheck(currentDate)}
        />
      </div>
      <div>
        <SelectField
            floatingLabelText="Participants"
            value={totalParticipants}
            onChange={(event, index, value) => onParticipantDropDownChange(event, index, value)}
            autoWidth={true}
          >
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </SelectField>
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Approver Name"          
          name="approverName"
          onChange={onChange}
          value={user.approverName}
          errorText={errors.approverName}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Log in" primary />
      </div>
    </form>
  </Card>
);
export default CreateInitiativeForm;
