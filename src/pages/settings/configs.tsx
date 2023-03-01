import { RightMenuItem } from "../../components/RightMenu/RightMenu.model";
import { SettingsConfig } from "./Models";
import styles from "./Settings.module.scss";
import { SECTIONS } from "./constants";
import { Button, IconButton, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from "@material-ui/core";
import { StringUtils } from "../../helpers/Utils";
import { Icon } from "../../components/Icon/Icon";
import PraesideoLogo from "../../images/logo.png";
import PDFFileIcon from "../../images/PDF_file_icon.png";
import { useState } from "react"
import { BillingModel, InvoiceModel, BankAccountModel } from "../../models/billing.model";
import { GridRow, GridRowData } from "@material-ui/data-grid";
import { createPdfFromHtml } from "./logic";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const PROD_SETTING_CONFIG: SettingsConfig[] = [
  {
    label: "Users & Roles",
    value: SECTIONS.USER_ROLES,
    iconProps: {
      icon: "user-lock",
    },
    type: "table",
    gridConfig: [],
    tableConfig: [
      {
        field: "username",
        headerName: "Users",
      },
      {
        field: "enabled",
        headerName: "Status",
        renderCell: (data: boolean) =>
          data ? (
            <div className={styles.active}>Active</div>
          ) : (
            <div className={styles.blocked}>Blocked</div>
          ),
      },
      {
        field: "role",
        headerName: "Role",
        renderCell: (data: string) => {
          const string = data?.toString().replace("_", " ");
          return StringUtils.capitalizeFirstLetter(string);
        },
      },
      {
        field: "impactDataPermission",
        headerName: "Impact Data",
        renderCell: (data: string) => StringUtils.capitalizeFirstLetter(data),
      },
      {
        field: "traceDataPermission",
        headerName: "Trace Data",
        renderCell: (data: string) => StringUtils.capitalizeFirstLetter(data),
      },
    ],
    formConfig: {
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: "false",
          placeholder: "Enabled",
          label: "Enable",
          flex: 1,
        },
        {
          name: "impactDataPermission",
          type: "select",
          defaultValue: "",
          placeholder: "Impact Data Permission",
          label: "Impact Data Permission",
          flex: 2,
          options: [
            {
              label: "Editor",
              value: "EDITOR",
            },
            {
              label: "Viewer",
              value: "VIEWER",
            },
          ],
        },
        {
          name: "traceDataPermission",
          type: "select",
          defaultValue: "",
          placeholder: "Trace Data Permission",
          label: "Trace Data Permission",
          flex: 2,
          options: [
            {
              label: "Editor",
              value: "EDITOR",
            },
            {
              label: "Viewer",
              value: "VIEWER",
            },
          ],
        },
      ],
    },
  },
]

export const DEV_SETTING_CONFIG: SettingsConfig[] = [
  {
    label: "Users & Roles",
    value: SECTIONS.USER_ROLES,
    iconProps: {
      icon: "user-lock",
    },
    type: "table",
    gridConfig: [],
    tableConfig: [
      {
        field: "username",
        headerName: "Users",
      },
      {
        field: "enabled",
        headerName: "Status",
        renderCell: (data: boolean) =>
          data ? (
            <div className={styles.active}>Active</div>
          ) : (
            <div className={styles.blocked}>Blocked</div>
          ),
      },
      {
        field: "role",
        headerName: "Role",
        renderCell: (data: string) => {
          const string = data?.toString().replace("_", " ");
          return StringUtils.capitalizeFirstLetter(string);
        },
      },
      {
        field: "impactDataPermission",
        headerName: "Impact Data",
        renderCell: (data: string) => StringUtils.capitalizeFirstLetter(data),
      },
      {
        field: "traceDataPermission",
        headerName: "Trace Data",
        renderCell: (data: string) => StringUtils.capitalizeFirstLetter(data),
      },
    ],
    formConfig: {
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: "false",
          placeholder: "Enabled",
          label: "Enable",
          flex: 1,
        },
        {
          name: "impactDataPermission",
          type: "select",
          defaultValue: "",
          placeholder: "Impact Data Permission",
          label: "Impact Data Permission",
          flex: 2,
          options: [
            {
              label: "Editor",
              value: "EDITOR",
            },
            {
              label: "Viewer",
              value: "VIEWER",
            },
          ],
        },
        {
          name: "traceDataPermission",
          type: "select",
          defaultValue: "",
          placeholder: "Trace Data Permission",
          label: "Trace Data Permission",
          flex: 2,
          options: [
            {
              label: "Editor",
              value: "EDITOR",
            },
            {
              label: "Viewer",
              value: "VIEWER",
            },
          ],
        },
      ],
    },
  },
  {
    label: "Billing & Payment",
    value: SECTIONS.BILLING_PAYMENT,
    iconProps: {
      icon: "file-invoice-dollar",
      solid: true,
    },
    type: "table",
    tableConfig: [
      {
        field: "invoiceType",
        headerName: "Billing",
      },
      {
        field: "invoiceDateFormatted",
        headerName: "Invoice date"
      },
      {
        field: "invoiceAmountFormatted",
        headerName: "Amount",
      },
      {
        field: "invoiceDueDateFormatted",
        headerName: "Due date",
      },
      {
        field: "invoiceStatus",
        headerName: "Status",
      },
      {
        field: "detail",
        headerName: "Detail",
        renderAllCells: (item) => (
          <>
            <InvoiceModal billingItem = {item}></InvoiceModal>
          </>
        ),
      },
    ],
    gridConfig: [
      {
        field: "invoiceType",
        flex: 2,
        headerName: "Billing",
      },
      {
        field: "invoiceDateFormatted",
        flex: 2,
        headerName: "Invoice date",
      },
      {
        field: "invoiceAmountFormatted",
        flex: 2,
        headerName: "Amount",
      },
      {
        field: "invoiceDueDateFormatted",
        flex: 2,
        headerName: "Due date",
      },
      {
        field: "invoiceStatus",
        flex: 1.5,
        headerName: "Status",
      },
      {
        field: "detail",
        flex: 1,
        headerName: "Detail", 
        sortable: false,
        filterable: false,
        editable: false,
        align: "center",
        renderCell: (item) => (
          <>
            <InvoiceModal billingItem = {item.row}></InvoiceModal>
          </>
        ),
      }
    ],
  },
]

export const InvoiceModal = (props: { billingItem: GridRowData })=>{
  const [printContent, setPrintContent] = useState<HTMLElement>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = (name: string) => {
    if (printContent) createPdfFromHtml(printContent, name);
  }

  return (
    <>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={handleOpen}
        style={{margin: 3}}
      >
        <Icon
          icon="search"
          size="1x"
          className={styles.icon}
          color="apple"
          solid
        />
      </IconButton>
      <Modal
        disableBackdropClick={false}
        hideBackdrop={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.buttonGroup}>
            <IconButton   
              size="small"
              aria-label="expand row"
              onClick={()=>handlePrint(`Praesideo Invoice ${props.billingItem.invoiceDateFormatted}`)}
              style = {{marginRight: 10}}
            >
              <img src={PDFFileIcon} alt="logo"  className={styles.pdfDownload}  />
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleClose}
            >
              <Icon
                icon="times"
                size="1x"
                className={styles.icon}
                color="white"
                solid
              />
            </IconButton>
          </div>
          <div
            ref={el => {
              if(el){
                setPrintContent(el);
              };
            }}
          >
            <Box className={styles.billingModal}>
              <div className={styles.billingModalTitle}>
                <img src={PraesideoLogo} alt="logo" className={styles.logo} />
              </div>
              <div style={{ marginTop: 10, marginBottom: 10 }} className={styles.billingModalFont}>
                <BillingDetailInfo title = {"Customer"} value={props.billingItem.customer}></BillingDetailInfo>
                <BillingDetailInfo title = {"Address"} value={props.billingItem.address}></BillingDetailInfo>
                <BillingDetailInfo title = {"Subscription"} value={props.billingItem.subscription}></BillingDetailInfo>
                <BillingDetailInfo title = {"Period"} value={props.billingItem.periodFormatted}></BillingDetailInfo>
                <BillingDetailInfo title = {"Amount"} value={props.billingItem.invoiceAmountFormatted}></BillingDetailInfo>
                <BillingDetailInfo title = {"Invoice Reference"} value={props.billingItem.invoiceReference}></BillingDetailInfo>
                <BillingDetailInfo title = {"Invoice Date"} value={props.billingItem.invoiceDateFormatted}></BillingDetailInfo>
                <BillingDetailInfo title = {"Invoice Due Date"} value={props.billingItem.invoiceDueDateFormatted}></BillingDetailInfo>
              </div>
              <BillingInvoiceList invoices = {props.billingItem.invoiceLineItems}></BillingInvoiceList>
            </Box>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const BillingDetailInfo = (props: { title: string; value: string })=>{
  return(
    <Box sx={{ display: 'flex'}}>
      <div style={{width: 180}}>{props.title}</div><div>: {props.value}</div>
    </Box>
  )
}  

export const BankAccountList = (props: { bankAccount: BankAccountModel[] })=>{

  const bankAccountList = props.bankAccount;

  return(
    <div className={styles.font12}>
      <div>For wire transfer please use the following accounts to pay invoices.</div>
      <div>
        <Icon
          icon="check-circle"
          className={styles.icon}
          color="blue"
          solid
        />
        <span style={{marginLeft: 20}}>Please make sure that amount is transferred net of fees.</span>
      </div>
      <div>
        <Icon
          icon="check-circle"
          className={styles.icon}
          color="blue"
          solid
        />
        <span style={{marginLeft: 20}}>Please add the invoice reference in the communication.</span>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
        {bankAccountList? bankAccountList.map((element)=>{
          return(
            <Box key = {element.id} sx={{ flexGrow: 0.4 }} className={styles.bankAccount} id="bankAccount">
              <BillingDetailInfo title = { "Account currency" } value = { element.currency }></BillingDetailInfo>
              <BillingDetailInfo title = { "Bank" } value = { element.bankName }></BillingDetailInfo>
              <BillingDetailInfoCopyButton title = { "AccountName" } value = { element.accountName } text={`${element.accountName}`}></BillingDetailInfoCopyButton>
              <BillingDetailInfoCopyButton title = { "AccountNumber" } value = { element.accountNumber } text={`${element.accountNumber}`}></BillingDetailInfoCopyButton>
              <BillingDetailInfoCopyButton title = { "BIC code" } value = { element.bicCode } text={`${element.bicCode}`}></BillingDetailInfoCopyButton>
              <BillingDetailInfoCopyButton title = { "Address" } value = { element.accountHolderAddress } text={`${element.accountHolderAddress}`}></BillingDetailInfoCopyButton>
              <BillingDetailInfo title = { "Country" } value = { element.country }></BillingDetailInfo>
            </Box>
          )
        }):""}
      </Box>
    </div>
  )
}   



export const BillingDetailInfoCopyButton = (props: { title: string; value: string; text: string })=>{
  return(
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }} className={styles.relation}>
      <BillingDetailInfo title = { props.title } value = { props.value }></BillingDetailInfo>
      <CopyButton text={ props.text }></CopyButton>
    </Box>
  )
}  

export const CopyButton = (props: { text: string })=>{
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return(
    <CopyToClipboard text = {props.text} onCopy={onCopyText}>
      <div className={styles.copyLocation}>
        {isCopied ? "Copied!" : 
          <Icon
            icon="copy"
            size="1x"
            color="darkGray"
            solid       
          />
        }
      </div>
    </CopyToClipboard>
  )
}  

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,

  },
}));

export const BillingInvoiceList = (props: { invoices: InvoiceModel[] })=>{
  const [rows, setInvoices] = useState(props.invoices);
  return(
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={styles.invoiceTableTitle}>
            <TableCell className={styles.invoiceTableTitleText} align="center">Invoice line item</TableCell>
            <TableCell className={styles.invoiceTableTitleText} align="center">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows? rows.map((row: InvoiceModel) => (
            <StyledTableRow key={row.id}>
              <TableCell align="left" style={row.invoiceItemType=="Total"?{fontWeight:"bold", padding: "10px 0"}:{padding: "10px 0"}} className={styles.billingModalFont}>{row.invoiceItemText}</TableCell>
              <TableCell align="right" style={row.invoiceItemType=="Total"?{fontWeight:"bold", padding: "10px 0"}:{}} className={styles.billingModalFont}>{row.invoiceItemDisplayAmount}</TableCell>
            </StyledTableRow>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>
  )
}   

export const PROD_ITEMS: RightMenuItem[] = [
  {
    label: "Settings",
    path: "account-settings",
    iconProps: {
      icon: "cog",
    },
    items: [
      {
        label: "Users & Roles",
        path: SECTIONS.USER_ROLES,
        iconProps: {
          icon: "user-lock",
        },
      }
    ],
  },
];

export const DEV_ITEMS: RightMenuItem[] = [
  {
    label: "Settings",
    path: "account-settings",
    iconProps: {
      icon: "cog",
    },
    items: [
      {
        label: "Users & Roles",
        path: SECTIONS.USER_ROLES,
        iconProps: {
          icon: "user-lock",
        },
      },
      {
        label: "Billing & Payment",
        path: SECTIONS.BILLING_PAYMENT,
        iconProps: {
          icon: "file-invoice-dollar",
          solid: true,
        },
      },
    ],
  },
];

export const MEMBER_ITEMS: RightMenuItem[] = [
  {
    label: "Settings",
    path: "account-settings",
    iconProps: {
      icon: "cog",
    },
    items: [
      {
        label: "Users & Roles",
        path: SECTIONS.USER_ROLES,
        iconProps: {
          icon: "user-lock",
        },
      }
    ],
  },
];