<div class='container mt-5 mb-5 h-100 d-flex align-items-center justify-content-center flex-column formDiv'>
    <form class="needs-validation p-3 w-100" id="contact" action="contact.php" method="post" novalidate>
        <input type="hidden" name="userAction" value="contact">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="nom">Nom</label>
                <input type="text" class="form-control" name="nom" pattern="<?= DataValider::$regex['lastname']; ?>" required>
                <div class="valid-feedback">
                    Champ Validé !
                </div>
                <div class="invalid-feedback">
                    Champ Obligatoire ! Uniquement lettre majuscules ou minuscules, espaces et - (min 3, max 100)
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="prenom">Prénom</label>
                <input type="text" class="form-control" name="prenom" pattern="<?= DataValider::$regex['firstname']; ?>" required>
                <div class="valid-feedback">
                    Champ Validé !
                </div>
                <div class="invalid-feedback">
                    Champ Obligatoire ! Uniquement lettre majuscules ou minuscules et - (min 3, max 27)
                </div>
            </div>
        </div>
        <div class="form-row d-flex justify-content-center">
            <div class="form-group col-md-6">
                <label for="email">email</label>
                <input type="email" class="form-control" id="mail" name="email" pattern="<?= DataValider::$regex['mail']; ?>" required>
                <div class="valid-feedback">
                    Champ Validé !
                </div>
                <div class="invalid-feedback">
                    Champ Obligatoire !
                    Votre adresse email n’est pas formaté correctement ! (exemple de format attendu: mrdupond@outlook.fr)
                </div>
            </div>

        </div>

        <div class="form-row d-flex justify-content-center">
            <div class="form-group col-md-10">
                <label for="message">message</label>
                <textarea class="form-control" id="text" rows="3" name="message" pattern="<?= DataValider::$regex['text']; ?>" required></textarea>
                <div class="valid-feedback">
                </div>
                <div class="invalid-feedback">
                    Champ Obligatoire ! (min 1, max 500)
                </div>
            </div>
        </div>
        <button type="submit" form='contact' class="btn btn-success">Sauvegarder</button>
    </form>
</div>