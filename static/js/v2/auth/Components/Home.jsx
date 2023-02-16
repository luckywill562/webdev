import React from 'react';
import { Link } from 'react-router-dom';
import { Love, LoveAlt, Today } from '../../icon/icons';
import Footer from './Footer';
import Nav from './Nav';
export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animation: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ animation: true })
        }, 0, 5);
    }
    render() {
        const logo = this.props.logo
        return (
            <>
                <Nav logo={logo} />
                <div className='background'>
                    <div className='container'>
                        <div className='landing'>

                            <div className='row'>
                                <div className='col-5'>
                                    <h1 className={`guest-title animated-alement ${this.state.animation && 'animate'}`}>Une rencontre plus serieux et plus libre avec <span className='p-color'>tafaray</span></h1>
                                    <p style={{ fontSize: '1rem' }} className={`text-secondary mb-40 animated-alement ${this.state.animation && 'animate'}`}>
                                        Tafaray est un site de rencontre malagasy . L'inscription est rapide et
                                        vous
                                        permettra d'accéder à de nombreux profils de personne célibataire de votre pays ou région pour trouver l'amour ou
                                        des
                                        amis.
                                    </p>
                                    <Link to="/register" className={`btn animated-alement ${this.state.animation && 'animate'}`}>
                                        Créer un compte Rapidement
                                    </Link>
                                </div>
                                <div className='col-7 Fdo Lns Aic'>
                                    <img src="./hero.jpg" style={{ maxWidth: '380px' }} className={`dib animated-alement ${this.state.animation && 'animate'}`} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='welcome'>
                        <div className='Fdo PKX VcB VhO gjz jzS mQ8 zI7 iyn Hsu'>
                            <div className='Fdo gjz jzS mQ8 zI7 iyn Hsu'>

                                <p style={{ fontSize: 24, }} className={`animated-alement ${this.state.animation && 'animate'}`}>Découvrir comment ça marche!</p>
                            </div>
                        </div>
                    </div>
                    <div className='arguments'>
                        <div className='container'>
                            <div className='row'>

                                <InfoColumn texte={`Matchez Gratuitement avec les personnes qui vous plait et entrer en contact directement avec elle quand vous avez un match.`}
                                    title={`Match`}>
                                    <Love />
                                </InfoColumn>
                                <InfoColumn texte={`Envoyer des messages graçe a Tafaray messenger, ce dernier vous permet aussi d'envoyer des cadeaux ou des contenu personnalisé a vos client.`} title={`Chat`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                                    </svg>
                                </InfoColumn>

                                <InfoColumn texte={`Gagner de l'argent graçe a votre contenu, photos ou videos en créant un abonnement prémium pour vos abonnés ou graçe à la monetisation du contenu`} title={`Gagnez de l'argent`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </InfoColumn>
                                <InfoColumn texte={`Réncontrer des personnes en direct en créant un rencard dans vos resto preferé et choisir parmis les utilisateurs interressé`}
                                    title={`Rencontre`}>
                                    <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 15.212,16.424c 2.874,0, 5.212-2.338, 5.212-5.212C 20.424,8.338, 18.086,6, 15.212,6S 10,8.338, 10,11.212 C 10,14.086, 12.338,16.424, 15.212,16.424z M 15.212,8c 1.77,0, 3.212,1.44, 3.212,3.212s-1.44,3.212-3.212,3.212S 12,12.982, 12,11.212 S 13.44,8, 15.212,8zM 14.484,31.458c 0.168,0.186, 0.33,0.306, 0.486,0.39c 0.002,0.002, 0.006,0.002, 0.008,0.004 c 0.108,0.056, 0.214,0.098, 0.314,0.098c 0.1,0, 0.206-0.042, 0.314-0.098c 0.002-0.002, 0.006-0.002, 0.008-0.004 c 0.156-0.084, 0.318-0.204, 0.486-0.39c0,0, 9.296-10.11, 10.23-18.87c 0.056-0.452, 0.094-0.91, 0.094-1.376 C 26.424,5.020, 21.404,0, 15.212,0S 4,5.020, 4,11.212c0,0.474, 0.038,0.936, 0.096,1.394C 5.054,21.362, 14.484,31.458, 14.484,31.458z M 15.212,2 c 5.080,0, 9.212,4.132, 9.212,9.212c0,0.338-0.024,0.698-0.082,1.164c-0.716,6.712-7.018,14.588-9.048,16.984 c-2.082-2.4-8.474-10.256-9.214-17C 6.026,11.918, 6,11.554, 6,11.212C 6,6.132, 10.132,2, 15.212,2z"></path></g></svg>
                                </InfoColumn>
                                <InfoColumn texte={`Partager vos photos ou vos videos de vos quotidiens ou pourquoi pas vos plus belle rencontre`}
                                    title={`Partager et liker`}>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22" height="22" viewBox="0 0 32 32" enableBackground="new 0 0 16 16" xmlSpace="preserve" fill="#000000"> <g><path d="M 27.1,10c0,0-7.622,0-9.1,0L 18,4.812 c 0.072-2.808-0.562-4.808-2.938-4.808C 12.5,0.004, 12,2.13, 12,2.13 C 11.532,9.66, 4,12, 4,12l0,16 l 2.922,0.124C 14.488,28.124, 9.948,32, 22.38,32C 31.82,32, 32,23.692, 32,18S 29.406,10, 27.1,10z M 22.38,30 c-6.316,0-7.654-1.006-8.836-1.894c-1.494-1.122-2.928-1.98-6.524-1.98c-0.004,0-0.008,0-0.012,0L 6,26.084L 6,13.344 C 8.494,12.18, 13.45,9.060, 13.978,2.51c 0.078-0.16, 0.336-0.506, 1.084-0.506c 0.178,0, 0.408,0.020, 0.506,0.12 C 15.65,2.206, 16.052,2.726, 16,4.812L 16,10 l0,2 l 2,0 l 9.1,0 C 28.542,12, 30,14.060, 30,18C 30,25.782, 28.786,30, 22.38,30zM 1,30C 1.552,30, 2,29.552, 2,29L 2,11.084 c0-0.552-0.448-1-1-1S0,10.532,0,11.084L0,29 C0,29.552, 0.448,30, 1,30z"></path></g></svg>
                                </InfoColumn>
                                <InfoColumn texte={`Si vous n'avez pas eu encore des match, vous pouver unvoyer des messages a une personne par hasard grace a tafaray incognito`}
                                    title={`Parler aux inconues`}>
                                    <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 27.91,11.79c 0.176,0.792, 0.278,1.606, 0.278,2.442c0,6.456-5.48,11.838-12.696,12.994 c 1.526,0.616, 3.236,0.976, 5.058,0.976c 1.718,0, 3.34-0.316, 4.804-0.866c 1.854,0.632, 3.878,0.796, 5.552,0.796 c-0.87-1.044-1.474-2.068-1.906-2.968C 30.856,23.508, 32,21.314, 32,18.898C 32,16.042, 30.406,13.496, 27.91,11.79zM 1.472,25.418c 0.174,0.33, 0.516,0.536, 0.886,0.536c 0.016,0, 0.034,0, 0.048-0.002 c 1.058-0.050, 3.162-0.752, 5.39-2.166c 1.192,0.21, 3.862,0.606, 4.794,0.606c 7.034,0, 12.542-4.898, 12.542-11.152 c0-6.15-5.624-11.152-12.542-11.152S 0.052,7.088, 0.052,13.238c0,2.862, 1.26,5.628, 3.478,7.698c-0.498,1.212-1.158,2.358-1.964,3.408 C 1.328,24.652, 1.292,25.072, 1.472,25.418z M 2.052,13.238c0-5.046, 4.728-9.152, 10.542-9.152s 10.542,4.106, 10.542,9.152 c0,5.216-4.532,9.152-10.542,9.152c-0.79,0-3.934-0.458-4.798-0.64c-0.264-0.052-0.538-0.004-0.758,0.146 c-0.858,0.568-1.666,0.998-2.37,1.314c 0.382-0.718, 0.712-1.462, 0.988-2.23c 0.142-0.398, 0.020-0.842-0.304-1.11 C 3.224,18.12, 2.052,15.764, 2.052,13.238z"></path></g></svg>
                                </InfoColumn>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
function InfoColumn({ children, title, texte }) {
    return <div className='col-4'>
        <h2>
            <span className='icon'>
                {children}
            </span>
           <span className='title'>{title}</span>
        </h2>
        <p>{texte}</p>
    </div>
}