<?php

class DataValider
{

    public $name;

    public $value;

    public $errorsLog = array();

    public static $regex = array(
        'lastname'      => '^[a-zA-Z ,.\'-]{3,100}$',
        'firstname'     => '^[a-zA-ZÀ-ÿ]{1,13}[-]?[a-zA-ZÀ-ÿ]?[a-zà-ÿ]{1,13}$',
        'phone'         => '^[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$',
        'password'      => '^(\w|[À-ÿ]|[0-9]|\s|-)+$',
        'phoneReg'      => '^0[1-9]([-. ]?\d{2}){4}$',
        'text'          => '^[\'a-zA-ZÀ-ÿ0-9\.\#<>,;\-&\r\n\s]{1,500}$',
        'mail'          => "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );

    public function value($data)
    {
        if (isset($data)) {
            if (!empty($data)) {
                $this->value = $data;
                return $this;
            } else {
                $this->value = null;
                return $this;
            }
        } else {
            throw new Exception('Erreur d\'envoi de données');
        }
    }

    public function name($name)
    {

        $this->name = $name;
        return $this;
    }
    public function required()
    {

        if (empty($this->value)) {
            $this->errorsLog[] = 'Champ ' . $this->name . ' obligatoire';
        }
        return $this;
    }


    public function pattern($name)
    {

        if ($name == 'array') {

            if (!is_array($this->value)) {
                $this->errorsLog[] = 'Champ ' . $this->name . ' non valide.';
            }
        } else {

            $regex = '/' . self::$regex[$name] . '/';
            if ($this->value != '' && !preg_match($regex, $this->value)) {
                $this->errorsLog[] = 'Champ ' . $this->name . ' non valide.';
            }
        }
        return $this;
    }


    public function isEmail()
    {
        if (filter_var($this->value, FILTER_VALIDATE_EMAIL)) {
            return true;
        } elseif($this->value == "" && $this->value == null) {
            ;
        } else {
            $this->errorsLog[] = 'Champ email non valide.';
        }
    }

    public function max($length)
    {

        if (is_string($this->value)) {

            if (strlen($this->value) > $length) {
                $this->errorsLog[] = 'nombre de caractères maximum pour ' . $this->name . ' trop grand';
            }
        } else {

            if ($this->value > $length) {
                $this->errorsLog[] = 'nombre de caractères maximum pour ' . $this->name . ' trop grand';
            }
        }
        return $this;
    }

    public function min($length)
    {

        if (is_string($this->value)) {

            if (strlen($this->value) < $length) {
                $this->errorsLog[] = 'nombre de caractères pour ' . $this->name . ' trop petit';
            }
        } else {

            if ($this->value < $length) {
                $this->errorsLog[] = 'nombre de caractères pour ' . $this->name . ' trop petit';
            }
        }
        return $this;
    }

    public function isSuccess()
    {
        if (empty($this->errorsLog)) return true;
    }


    public function getErrors()
    {
        if (!$this->isSuccess()) return $this->errorsLog;
    }


    public function postClean()
    {
        foreach ($_POST as $key => $value) {
            $_POST[$key] =htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        }
    }

}
