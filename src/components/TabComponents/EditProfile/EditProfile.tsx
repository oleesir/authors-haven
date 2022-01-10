import React from 'react';
import Button from '../../Button/Button';
import classes from './EditProfile.module.css';
const EditProfile = () => {
	return (
		<div className={classes.Container}>
			<form>
				<label>
					<b>Fullname</b>
				</label>
				<input type='text' placeholder='Eleina Olivares' name='uname' className={classes.InputField} />

				<label>
					<b>Short bio</b>
				</label>
				<textarea
					name='subject'
					placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tristique ullamcorper eget vestibulum, at.  At integer arcu morbi at pulvinar .'
					className={classes.TextArea}
				></textarea>

				<label>
					<b>Email</b>
				</label>
				<input type='text' placeholder='************' name='uname' className={classes.InputField} />

				<label>
					<b>Password</b>
				</label>
				<input type='text' placeholder='Enter Password' name='psw' className={classes.InputField} />

				<label>
					<b>Facebook</b>
				</label>
				<input
					type='text'
					placeholder='https://www.facebook.com/eleinaolivares'
					name='uname'
					className={classes.InputField}
				/>

				<label>
					<b>Twitter</b>
				</label>
				<input
					type='text'
					placeholder='https://www.twitter.com/eleinaolivares'
					name='uname'
					className={classes.InputField}
				/>

				<label>
					<b>Linkedin</b>
				</label>
				<input
					type='text'
					placeholder='https://www.linkedIn.com/eleinaolivares'
					name='uname'
					className={classes.InputField}
				/>

				<label>
					<b>Location</b>
				</label>
				<input type='text' placeholder='Lagos, Nigeria' name='uname' className={classes.InputField} />

				<div className={classes.BtnField}>
					<Button btnTypes={'SubmitModalBtn'} sizes={''}>
						Update
					</Button>
				</div>
			</form>
		</div>
	);
};
export default EditProfile;
