import React, { useCallback, useEffect, useState } from 'react';
import { generateAccount } from '../../utils/AccountUtils';
import { Account } from '../../models/Account';
import AccountDetail from './AccountDetail';

const recoveryPhraseKeyName = 'recoveryPhrase';
const accountName='accountName'
function AccountCreate() {
  const [seedphrase, setSeedphrase] = useState('');

  const [account, setAccount] = useState<Account | null>(null);

  
  const [showRecoverInput, setShowRecoverInput] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeedphrase(event.target.value);
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      recoverAccount(seedphrase);
    }
  }

  const recoverAccount = useCallback(

    async (recoveryPhrase: string) => {


      const result = await generateAccount(recoveryPhrase);

      setAccount(result.account);

      if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
        localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
      }

    }, []
  );

  useEffect(() => {

    const localStorageRecoveryPhrase = localStorage.getItem(recoveryPhraseKeyName)
    if (localStorageRecoveryPhrase) {
      setSeedphrase(localStorageRecoveryPhrase);
      recoverAccount(localStorageRecoveryPhrase);
    }
  }, [recoverAccount])

  async function createAccount() {
    const result = await generateAccount();
    setAccount(result.account);
    console.log(result.seedPhrase)
     localStorage.setItem(accountName,result.seedPhrase)
  }

  return (
    <div className='card2 bg-blur p-5 m-3 card shadow' style={{background:"#F8F8F8"}}>
      <h1 className='text-gradient'>
        BFSC Wallet
      </h1>
      <form onSubmit={event => event.preventDefault()}>
        <button type="button" className="button-34" style={{marginRight:"1rem"}} onClick={createAccount}>
          Create Account
        </button>
       
        <button type="button" className='button-34'
          onClick={() => showRecoverInput ? recoverAccount(seedphrase) : setShowRecoverInput(true)}
          // if the recoveryinput is showing but there is no seedphrase, disable the ability to recover account
          disabled={showRecoverInput && !seedphrase}
        >
          Recover account
        </button>
        {showRecoverInput && (
          <div className="form-group mt-3">
            <input type="text" placeholder='Seedphrase or private key for recovery' className="form-control"
              value={seedphrase} onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
        )}
      </form>
      {account &&
        <>
          <hr />
          <AccountDetail account={account} />
        </>
      }
    </div>
  )

}
export default AccountCreate;