import React from 'react';
import SimpleTemplate from '../../Templates/SimpleTemplate';
import Header from '../../../containers/ChangeHeaderEvent/HeaderContainer';
import Profile from '../../Molecules/Profile/Profile';

export default function ProfilePage() {
    return (
        <SimpleTemplate>
            <Profile />
        </SimpleTemplate>
    );
}
