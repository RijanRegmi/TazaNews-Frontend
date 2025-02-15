

function Login(){
    return(
        <>
            <section>
                <h1>Welcome to TazaNews</h1>
                
                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required></input>


                    <label for="psw"><b>Username</b></label>
                    <input type="password" placeholder="Enter password" name="psw" required></input>


                    <button type="submit">Login</button>
                        <label>
                            <input type="checkbox" checked="checked" name="remember"> Remember me</input>
                        </label>
                </div>
            </section>
        </>
    );
}

export default Login