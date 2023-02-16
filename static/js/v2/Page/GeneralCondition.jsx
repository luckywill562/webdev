import React from "react";
import './page.css'
const GeneralCondition = () => {

    return <div className="Info">
        <h1 className="guest-title" style={{ marginBottom: '10px' }}>Règlement de la comunauté</h1>
        <div>il est recomander de bien lire tous ce qui suit</div>
        <ItemTitle>Règlement sur les photos</ItemTitle>
        <div className="item-text">
            <Item>Publier <span className="text-red">une photo nue ou une video a caractères sexuelle ou pornographique</span> sur le site est strictement interdits</Item>
            <Item>Certains photos en maillot de bain sont aussi interdites, comme une photo qui montre un plan de grosse fesse, ou une photo de vous ou d'une personne portant un bikini.</Item>
            <Item>Si vous êtes une mère, vous serez autorisé a montrer une photo ou videos de vous en train d'allaiter votre enfant. Par contre le visage de votre enfant ne doit pas être visible complètement</Item>
            <Item>Il est strictement interdit de montrer <span className="text-red">le visage d'un enfant</span>  sur le site (lire le paragraphe ci-dessu si vous êtes parents)</Item>
            <Item>Vous êtes autorisé a publier une photo de vous dans une voiture ou sur une moto mais la marque du vehicule ne doit pas être visible sur la photo</Item>
            <Item>Une photo d'un immeuble, voiture,maison ou une photo de vous devant, derrière un immeuble, maison, voiture, moto consideré comme <span className="text-red">luxe</span> est aussi interdites</Item>
            <Item>Vous n'êtes pas autorisé a montrer une photo d'argent, que l'argent vous appartient ou non, c'est interdit quelque soit la devise</Item>
            <Item>Certaines photos ou videos comportant des scenes de violences  pourriont etre supprimer</Item>
            
        </div>
        <ItemTitle>Lorsque vous publier une photos de vous</ItemTitle>
        <div className="item-text">
            <Item>Eviter d'utiliser trop de filtre</Item>
            <Item>Si vous êtes une fille, votre jupe ne de doit pas être trop courte</Item>
            <Item>Pareil pour les garçon, si vous portez un short, il ne doit pas être trop court</Item>
            <Item>Si vous êtes un couple,<span className="text-red">les photos de bisous</span>  sont autorisé mais la photo ne doit pas être prise a moins de 6 mètres</Item>
            <Item>Votre visage doit être complètement visible sur la photo</Item>
            <Item>Votre vêtement doit vous couvrir complètement. (ça ne veut pas dire que vous devriez vous couvrir de la tête au pied mais ça veut dire habillez vous correctement)</Item>
        </div>
        <ItemTitle>Règlement sur les contenus que vous  publier</ItemTitle>
        <div className="item-text">
            <Item>Les diffamations, incitations a la haine, homophobie, racisme... sont interdites</Item>
            <Item>jugez une peronnes pour son physique, sa religion, orientation sexuelle n'est pas du tout permis sur tafaray</Item>
            <Item>Brandir le drapeau LGBTQA+ ainsi que quelques drapeaux ou signe comme le croix gammé est strictement interdit.</Item>
            <Item>Les publications ou commentaires qui ne respecte pas les traditions pourront etre effacer </Item>
            <Item><span className="text-red">ce n'est pas sur tafaray que vous devez passer un message politique(votre compte serra effacer imediatement  si vous enfreyer cette regle)</span></Item>
            
        </div>
        <div className="info-footer">
            <h2>Attention !</h2>
            <p>vous risquez l'expulsion et de ne plus pouvoir utiliser nos services  si vous ne suivez pas ces règles </p>
            <p dangerouslySetInnerHTML={{ __html: '&copy l\'equipe tafaray 2023'}}></p>
        </div>
    </div>
}
const ItemTitle = ({ children }) => {
    return <div className="item-title">
        <h2>{children}</h2>
    </div>
}
const Item = ({ children }) => {
    return <p>-{children}</p>
}
export default GeneralCondition