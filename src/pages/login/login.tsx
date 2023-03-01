import styles from "./login.module.scss";
import useLogin from "./useLogin";

//Components
import CustomForm from "../../components/CustomForm/CustomForm";
import { Button } from "@material-ui/core";

//Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { loginSectionConfig } from "./configs";
import { Icon } from "../../components/Icon/Icon";
import { Alert } from "@material-ui/lab";
import Logo from "../../images/logo.png";
import ForgetPassword from "../forget-password";
import SignUp from "../signup";
import RecoveryEmailSuccess from "../recovery-email-success";
import { SECTIONS } from "./constants";
import SetUpSubscription from "../set-up-subscription";
import { ThemeProvider } from "@material-ui/core";
import { loginTheme } from "./loginTheme";
import ChangePasswordForm from "../change-password";

const Login = () => {
  const {
    state,
    handleClickOnAlternativeButton,
    handleClickOnSubmitFormButton,
    handleClickOnGoToLogin,
    handleAlertClose,
  } = useLogin();
  const activeConfig = loginSectionConfig;

  const renderEmailConfirmation = () => {
    return (
      <div className={styles.emailConfirmed}>
        {state.activationMessage && state.activationMessage.valid && (
          <Icon icon={"user-check"} size={"3x"} color="white" />
        )}
        {state.activationMessage && !state.activationMessage.valid && (
          <Icon icon={"user-times"} size={"3x"} color="red" />
        )}
        {state.activationMessage && state.activationMessage.valid && (
          <>
            <h2>Your email address was</h2>
            <h1>confirmed</h1>
          </>
        )}
        {state.activationMessage && !state.activationMessage.valid && (
          <>
            <h2>Your email address is</h2>
            <h1 className={styles.red}>invalid</h1>
          </>
        )}
        <Button
          variant="outlined"
          color={"primary"}
          onClick={handleClickOnGoToLogin}
        >
          Go to login
        </Button>
      </div>
    );
  };

  const renderActiveForm = () => {
    return (
      <div className={styles.form}>
        <h1>{activeConfig.title}</h1>
        {activeConfig.subTitle ? <h2>{activeConfig.subTitle}</h2> : <></>}
        {activeConfig.description ? (
          <h3 className={styles.sectionDescription}>
            {activeConfig.description}
          </h3>
        ) : (
          <></>
        )}
        {activeConfig.formConfig ? (
          <div className={styles.customForm}>
            <CustomForm
              config={activeConfig.formConfig}
              onSubmit={handleClickOnSubmitFormButton}
              isDataEditable={true}
            />
          </div>
        ) : (
          <></>
        )}
        {activeConfig.alternativeOptionQuestion ? (
          <p className={styles.noAccount}>
            <span>{activeConfig.alternativeOptionQuestion}</span>
          </p>
        ) : (
          <></>
        )}
        {activeConfig.alternativeOptionButtonLabel ? (
          <Button variant="outlined" onClick={handleClickOnAlternativeButton}>
            {activeConfig.alternativeOptionButtonLabel}
          </Button>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const renderSignupSuccess = () => {
    return (
      <div className={styles.emailConfirmed}>
        <Icon icon={"envelope-open-text"} size={"3x"} color="white" />
        <h2>Your account was</h2>
        <h1>successfully created</h1>
        <p>
          A confirmation email was sent to your email address. Please double
          check in the <b>spam</b> folder
        </p>
        <Button
          variant="outlined"
          color={"primary"}
          onClick={handleClickOnGoToLogin}
        >
          Go to login
        </Button>
      </div>
    );
  };

  const renderPageContent = () => {
    switch (state.activeSection) {
      case SECTIONS.LOGIN:
        return renderActiveForm();
      case SECTIONS.PERSONAL_DATA:
        return (
          <SignUp
            handleClickOnAlternativeButton={handleClickOnAlternativeButton}
            handleClickOnSubmitFormButton={handleClickOnSubmitFormButton}
          />
        );
      case SECTIONS.ACTIVATE_ACCOUNT:
        return renderEmailConfirmation();
      case SECTIONS.SIGNUP_SUCCESS:
        return renderSignupSuccess();
      case SECTIONS.FORGET_PASSWORD:
        return <ForgetPassword />;
      case SECTIONS.EMAIL_SENT:
        return <RecoveryEmailSuccess />;
      case SECTIONS.CHANGE_PASSWORD:
        return <ChangePasswordForm />;
      case SECTIONS.SET_UP_SUBSCRIPTION:
        return <SetUpSubscription />;
      default:
        return <></>;
    }
  };

  return (
    <ThemeProvider theme={loginTheme}>
      <div className={styles.container}>
        {state.error && (
          <Alert
            severity="error"
            className={styles.alert}
            onClose={handleAlertClose}
          >
            {state.error}
          </Alert>
        )}
        <div className={styles.wrapper}>
          <div className={styles.carouselWrapper}>
            <Carousel
              className="carousel-wrapper"
              showArrows={false}
              showThumbs={false}
              dynamicHeight
              autoPlay
              infiniteLoop
              interval={7000}
            >
              <div className={styles.carouselImage1}>
                <h1 className={styles.carouselMessage1}>
                  Trusted climate insights for corporate action.
                </h1>
              </div>
              <div className={styles.carouselImage1}>
                <h1 className={styles.carouselMessage2}>
                  No one gets to net-zero without addressing value chain emissions.
                </h1>
              </div>
              <div className={styles.carouselImage1}>
                <h1 className={styles.carouselMessage3}>
                  “TCFD believes that reporting around Scope 3 emissions has
                  matured enough to warrant inclusion in disclosures”. TCFD
                </h1>
              </div>
            </Carousel>
          </div>
          <div className={styles.formWrapper}>
            <img src={Logo} alt={"logo"} />
            {renderPageContent()}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
