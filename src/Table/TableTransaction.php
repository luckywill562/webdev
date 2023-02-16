<?php
namespace Src\Table;
use \Src\App\Table\Table;
use \Src\App\Connexion\Connexion;
use Src\Src;
class TableTransaction extends Table{
    public function AllTransaction($user_id){
        return $this->request("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_At DESC",[$user_id],NULL);
    }
    public function TransactionDepot($user_id){
        return $this->request("SELECT SUM(montant) as valeur FROM transactions WHERE user_id = ? AND transaction_type = 'D'",[$user_id],TRUE);
    }
    public function TransactionSend($user_id){
        return $this->request("SELECT SUM(montant) as valeur FROM transactions WHERE user_id = ? AND transaction_type != 'D'", [$user_id],TRUE);
    }

    public function Account($user_id){
        return $this->request("SELECT soldes FROM koko_users
         WHERE id = ? ",[$user_id],TRUE);
    }

    public function CalculSoldeAccount($user_id){
        return $this->Account($user_id)->soldes; 
    }
    //changer en dollar 
    public function convertToReference(int $montant, int $reference){
        if($montant > 0 && $reference >0){
            return  $montant /  $reference;
        }else{
            return null;
        }
    }
    // calculer le prix d'un element au devise du client
    public function GetUserWithDevise($user_id){
        return $this->request("SELECT *,taux_de_change.id as tid FROM koko_users 
        INNER JOIN taux_de_change ON  koko_users.devise = taux_de_change.id 
        WHERE koko_users.id = ?",[$user_id],TRUE);
    }
    public function CalculPrice(int $montant, $client_id, $session_id){
        $app = Src::getInstance();
        if($this->GetUserWithDevise($client_id) && $this->GetUserWithDevise($session_id)){
            try {
                $convert_montant_to_reference = $montant / $this->GetUserWithDevise($client_id)->reference_en_dollar;
                return $convert_montant_to_reference*$this->GetUserWithDevise($session_id)->reference_en_dollar; 
            } catch (\Throwable $th) {
               $app->Exception($th);
            }
        }else{
         $app->E422();
            exit();
        }
        
    }
   
    public function Transaction_type($transaction_type ,$montant = 0){
        $transaction_name ='';
        $info= '';
        if($transaction_type === "DEPOT"){
            $transaction_name = 'Depot';
            $info = "Vous avez transferer $montant  pour debloquer un contenu";
        }elseif($transaction_type === "TRANSFERT"){
            $transaction_name = 'Transfert';
            $info = "Vous avez transferer $montant vers un utilisateur";
        }elseif($transaction_type === "BUY_POINTS"){
            $transaction_name = 'Achat des Jetons';
            $info = 'Vous avez acheter un offre';
        }elseif($transaction_type === "4"){
            $transaction_name = 'Achat';
            $info = '';
        }elseif($transaction_type === "DEDUCTION_FOR_MEDIAS"){
            $transaction_name = 'Achat d\'un contenu';
            $info = "Vous avez transferer $montant  pour debloquer un contenu";
        }
        return ['name'=>$transaction_name,'info'=>$info];
    }
    public function Offres(){
        return $this->request('SELECT * FROM offres_jetons',null);
    }
    public function selectOffre($id){
        return $this->request('SELECT * FROM offres_jetons WHERE id = ?',[$id],TRUE);
    }

    public function SelectTotaPoints($user_id){
        return $this->request('SELECT SUM(rest) as total FROM user_points WHERE user_id = ?', [$user_id], true);
    }
    public function GetmaxOffersExpirationDate($user_id){
        return $this->request("SELECT MAX(expiredAt) as expiredAt FROM user_points WHERE user_id= ? ", [$user_id], true);
    }
    public function getPoints($user_id){
        return $this->request("SELECT * FROM user_points WHERE user_id = ? AND expiredAt > DATE_SUB(NOW(), INTERVAL 0 MINUTE)", [$user_id]);
    }
    public function getCurrency(){
        return $this->request("SELECT * FROM taux_de_change");
    }
}