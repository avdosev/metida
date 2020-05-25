import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import Field from "../../Molecules/Field/Field";
import {IUser} from "../../Organisms/IUser";


export default function Home() {
    const userString = localStorage.getItem('user')
    let user: IUser = {accessToken: "", activatedEmail: false, createdAt: new Date(), email: "", id: 0, password: "", updatedAt: new Date(), username: ""}
    if (userString) {
        user = JSON.parse(userString)
        console.log(user)
    }


    return (<SimpleTemplate header={<Header />} content={
        <div className="layout_body">
            <h1>Профиль {user.username}</h1>
            <h3>Заработанные ачивки</h3>
            <h4>*красивые картинки, мотивирующие юзера пользоваться сайтом*</h4>
            <h5>Поменять данные в бд</h5>
            <div className="inputForm">
                <form className="reg" action="/update" method="post" name="update">
                    <label>
                        <input id="email" type="email" name="email" placeholder="Type email" required
                               pattern="^\w+@\w+\.\w+$" />
                            Email
                    </label>

                    <label>
                        <input id="login" type="login" name="login" placeholder="Type login" required
                               pattern="^\w+$"  />
                            Login
                    </label>


                    <label>
                        <input id="password" type="password" name="password" placeholder="Type old password"
                               required pattern=".{5,}"/>
                        Old password
                    </label>

                    <label>
                        <input id="newpassword" type="password" name="password" placeholder="Type new password"
                               pattern=".{5,}" />
                            New password
                    </label>

                    <label>
                        <input id="repassword" type="password" name="repassword" placeholder="Retype new password"
                               required />
                            Retype new password
                    </label>

                    <input id="submit" type="submit" value="OK" />
                </form>
            </div>

        </div>} />
      )
}